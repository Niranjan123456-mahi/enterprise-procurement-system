package com.enterprise.procurement.service;

import com.enterprise.procurement.dto.RequisitionActionRequest;
import com.enterprise.procurement.dto.RequisitionCreateRequest;
import com.enterprise.procurement.entity.*;
import com.enterprise.procurement.event.RequisitionApprovedEvent;
import com.enterprise.procurement.exception.BadRequestException;
import com.enterprise.procurement.exception.ResourceNotFoundException;
import com.enterprise.procurement.repository.*;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class RequisitionService extends BaseService<Requisition, Long> {

    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final CategoryRepository categoryRepository;
    private final SupplierRepository supplierRepository;
    private final ApprovalRuleRepository approvalRuleRepository;
    private final ApprovalRuleApproverRepository approvalRuleApproverRepository;
    private final RequisitionHistoryRepository requisitionHistoryRepository;
    private final AuditLogRepository auditLogRepository;
    private final ApplicationEventPublisher eventPublisher;

    public RequisitionService(RequisitionRepository repository,
                              UserRepository userRepository,
                              DepartmentRepository departmentRepository,
                              CategoryRepository categoryRepository,
                              SupplierRepository supplierRepository,
                              ApprovalRuleRepository approvalRuleRepository,
                              ApprovalRuleApproverRepository approvalRuleApproverRepository,
                              RequisitionHistoryRepository requisitionHistoryRepository,
                              AuditLogRepository auditLogRepository,
                              ApplicationEventPublisher eventPublisher) {
        super(repository);
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.categoryRepository = categoryRepository;
        this.supplierRepository = supplierRepository;
        this.approvalRuleRepository = approvalRuleRepository;
        this.approvalRuleApproverRepository = approvalRuleApproverRepository;
        this.requisitionHistoryRepository = requisitionHistoryRepository;
        this.auditLogRepository = auditLogRepository;
        this.eventPublisher = eventPublisher;
    }

    // ---------------------------------------------------------------
    // CREATE
    // ---------------------------------------------------------------

    @Transactional
    public Requisition create(RequisitionCreateRequest request, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

        Department department = departmentRepository.findById(user.getDepartment().getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found for current user"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id " + request.getCategoryId()));

        Supplier supplier = null;
        if (request.getSupplierId() != null) {
            supplier = supplierRepository.findById(request.getSupplierId())
                    .orElseThrow(() -> new ResourceNotFoundException("Supplier not found with id " + request.getSupplierId()));
        }

        BigDecimal totalAmount = calculateTotalAmount(request.getItems());

        Optional<ApprovalRule> matchingRule = approvalRuleRepository
                .findMatchingRule(department.getDepartmentId(), category.getCategoryId(), totalAmount);

        Requisition requisition = new Requisition();
        requisition.setRequisitionNumber(generateRequisitionNumber());
        requisition.setCreatedBy(user);
        requisition.setDepartment(department);
        requisition.setSupplier(supplier);
        requisition.setCategory(category);
        requisition.setTitle(request.getTitle());
        requisition.setJustification(request.getJustification());
        requisition.setNeededBy(request.getNeededBy());
        requisition.setTotalAmount(totalAmount);
        // No matching rule at all = nothing to approve, goes straight to SUBMITTED.
        // (Worth confirming with your team whether this should really be an
        // auto-approval path or should require manual admin review instead.)
        requisition.setStatus(matchingRule.isPresent()
                ? RequisitionStatus.PENDING_APPROVAL
                : RequisitionStatus.SUBMITTED);

        List<RequisitionLineItem> lineItems = request.getItems().stream()
                .map(item -> RequisitionLineItem.builder()
                        .requisition(requisition)
                        .description(item.getDescription())
                        .quantity(item.getQuantity())
                        .unitPrice(item.getUnitPrice())
                        .build())
                .collect(Collectors.toList());
        requisition.setLineItems(lineItems);

        Requisition savedRequisition = save(requisition);
        createHistory(savedRequisition, user, "Submitted", "Request submitted for approval");

        // Save AuditLog
        AuditLog audit = AuditLog.builder()
                .user(user)
                .module("Requisition")
                .action("CREATE")
                .entityName("Requisition")
                .entityId(savedRequisition.getRequisitionId())
                .remarks("Created Requisition " + savedRequisition.getRequisitionNumber())
                .build();
        auditLogRepository.save(audit);

        return savedRequisition;
    }

    // ---------------------------------------------------------------
    // APPROVE / REJECT  — now a real ordered multi-step chain
    // ---------------------------------------------------------------

    @Transactional
    public Requisition actOnRequisition(Long id, RequisitionActionRequest request, String username) {
        Requisition requisition = findById(id);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

        if (!RequisitionStatus.PENDING_APPROVAL.equalsIgnoreCase(requisition.getStatus())) {
            throw new BadRequestException("Only requisitions pending approval can be acted upon");
        }

        // 1. Find the rule that governs this requisition
        ApprovalRule rule = approvalRuleRepository
                .findMatchingRule(requisition.getDepartment().getDepartmentId(),
                        requisition.getCategory().getCategoryId(),
                        requisition.getTotalAmount())
                .orElseThrow(() -> new BadRequestException(
                        "No approval rule found for this requisition — cannot determine approver chain"));

        // 2. Get the ordered chain of required roles for that rule
        List<ApprovalRuleApprover> chain = approvalRuleApproverRepository
                .findByRule_RuleIdOrderBySequenceNoAsc(rule.getRuleId());

        if (chain.isEmpty()) {
            throw new BadRequestException("Approval rule " + rule.getRuleId() + " has no approvers configured");
        }

        // 3. Figure out which step we're on by counting completed "Approved" steps so far
        long completedSteps = requisitionHistoryRepository
                .countByRequisition_RequisitionIdAndStep(requisition.getRequisitionId(), "Approved");

        if (completedSteps >= chain.size()) {
            throw new BadRequestException("This requisition has already completed its approval chain");
        }

        ApprovalRuleApprover currentStep = chain.get((int) completedSteps);
        Long requiredRoleId = currentStep.getRole().getRoleId();

        // 4. Confirm the logged-in user actually holds the role required for THIS step
        //    (not just "any approver role" — must be the correct one, in order)
        boolean isCorrectApprover = user.getUserRoles().stream()
                .anyMatch(userRole -> userRole.getRole().getRoleId().equals(requiredRoleId));

        if (!isCorrectApprover) {
            throw new AccessDeniedException(
                    "This requisition is currently awaiting approval from role: "
                            + currentStep.getRole().getRoleName() + ". You are not authorized to act on it yet.");
        }

        String action = request.getAction().trim().toUpperCase();

        if ("APPROVE".equals(action) || "APPROVED".equals(action)) {
            createHistory(requisition, user, "Approved", request.getRemarks());

            boolean wasLastStep = (completedSteps + 1) == chain.size();
            if (wasLastStep) {
                requisition.setStatus(RequisitionStatus.APPROVED);
                eventPublisher.publishEvent(new RequisitionApprovedEvent(this, requisition));
            }
            // If it wasn't the last step, status stays PENDING_APPROVAL —
            // the next approver in the chain now sees it in their pending list.

        } else if ("REJECT".equals(action) || "REJECTED".equals(action)) {
            requisition.setStatus(RequisitionStatus.REJECTED);
            createHistory(requisition, user, "Rejected", request.getRemarks());

        } else {
            throw new BadRequestException("Action must be either APPROVE or REJECT");
        }

        Requisition savedRequisition = save(requisition);

        // Save AuditLog
        AuditLog audit = AuditLog.builder()
                .user(user)
                .module("Approval")
                .action(action)
                .entityName("Requisition")
                .entityId(savedRequisition.getRequisitionId())
                .remarks("Requisition " + action + " by " + user.getUsername() + (request.getRemarks() != null ? " — " + request.getRemarks() : ""))
                .build();
        auditLogRepository.save(audit);

        return savedRequisition;
    }

    // ---------------------------------------------------------------
    // QUERIES
    // ---------------------------------------------------------------

    public List<Requisition> findMyRequisitions(String username) {
        return ((RequisitionRepository) repository).findByCreatedBy_UsernameOrderByCreatedAtDesc(username);
    }

    public List<Requisition> findByStatus(String status) {
        return ((RequisitionRepository) repository).findByStatusOrderByCreatedAtDesc(status);
    }

    // "What's pending for ME to approve right now" — computes current step per
    // requisition, same logic as actOnRequisition, but read-only and filtered
    // to requisitions where it's currently this user's turn.
    public List<Requisition> findPendingForApprover(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

        List<Long> userRoleIds = user.getUserRoles().stream()
                .map(userRole -> userRole.getRole().getRoleId())
                .collect(Collectors.toList());

        List<Requisition> pending = ((RequisitionRepository) repository)
                .findByStatusOrderByCreatedAtDesc(RequisitionStatus.PENDING_APPROVAL);

        return pending.stream()
                .filter(req -> isCurrentUsersTurn(req, userRoleIds))
                .collect(Collectors.toList());
    }

    private boolean isCurrentUsersTurn(Requisition requisition, List<Long> userRoleIds) {
        Optional<ApprovalRule> ruleOpt = approvalRuleRepository.findMatchingRule(
                requisition.getDepartment().getDepartmentId(),
                requisition.getCategory().getCategoryId(),
                requisition.getTotalAmount());

        if (ruleOpt.isEmpty()) return false;

        List<ApprovalRuleApprover> chain = approvalRuleApproverRepository
                .findByRule_RuleIdOrderBySequenceNoAsc(ruleOpt.get().getRuleId());
        if (chain.isEmpty()) return false;

        long completedSteps = requisitionHistoryRepository
                .countByRequisition_RequisitionIdAndStep(requisition.getRequisitionId(), "Approved");
        if (completedSteps >= chain.size()) return false;

        Long requiredRoleId = chain.get((int) completedSteps).getRole().getRoleId();
        return userRoleIds.contains(requiredRoleId);
    }

// ---------------------------------------------------------------
    // HELPERS (unchanged from your version)
    // ---------------------------------------------------------------

    private void createHistory(Requisition requisition, User actionBy, String step, String remarks) {
        RequisitionHistory history = RequisitionHistory.builder()
                .requisition(requisition)
                .actionBy(actionBy)
                .step(step)
                .remarks(remarks)
                .build();
        requisitionHistoryRepository.save(history);
    }

    private BigDecimal calculateTotalAmount(List<RequisitionCreateRequest.LineItemRequest> items) {
        return items.stream()
                .map(item -> item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private String generateRequisitionNumber() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        int suffix = new Random().nextInt(9000) + 1000;
        return "REQ-" + timestamp + "-" + suffix;
    }

    public Requisition update(Long id, Requisition requisition) {
        Requisition existing = findById(id);
        existing.setRequisitionNumber(requisition.getRequisitionNumber());
        existing.setCreatedBy(requisition.getCreatedBy());
        existing.setDepartment(requisition.getDepartment());
        existing.setSupplier(requisition.getSupplier());
        existing.setCategory(requisition.getCategory());
        existing.setTitle(requisition.getTitle());
        existing.setJustification(requisition.getJustification());
        existing.setNeededBy(requisition.getNeededBy());
        existing.setTotalAmount(requisition.getTotalAmount());
        existing.setStatus(requisition.getStatus());
        return save(existing);
    }
}