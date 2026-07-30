package com.enterprise.procurement.service;

import com.enterprise.procurement.dto.RequisitionActionRequest;
import com.enterprise.procurement.dto.RequisitionCreateRequest;
import com.enterprise.procurement.entity.Category;
import com.enterprise.procurement.entity.Department;
import com.enterprise.procurement.entity.Requisition;
import com.enterprise.procurement.entity.RequisitionHistory;
import com.enterprise.procurement.entity.RequisitionLineItem;
import com.enterprise.procurement.entity.RequisitionStatus;
import com.enterprise.procurement.entity.Supplier;
import com.enterprise.procurement.entity.User;
import com.enterprise.procurement.exception.BadRequestException;
import com.enterprise.procurement.exception.ResourceNotFoundException;
import com.enterprise.procurement.repository.ApprovalRuleRepository;
import com.enterprise.procurement.repository.CategoryRepository;
import com.enterprise.procurement.repository.DepartmentRepository;
import com.enterprise.procurement.repository.RequisitionHistoryRepository;
import com.enterprise.procurement.repository.RequisitionRepository;
import com.enterprise.procurement.repository.SupplierRepository;
import com.enterprise.procurement.repository.UserRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class RequisitionService extends BaseService<Requisition, Long> {

    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final CategoryRepository categoryRepository;
    private final SupplierRepository supplierRepository;
    private final ApprovalRuleRepository approvalRuleRepository;
    private final RequisitionHistoryRepository requisitionHistoryRepository;

    public RequisitionService(RequisitionRepository repository,
                              UserRepository userRepository,
                              DepartmentRepository departmentRepository,
                              CategoryRepository categoryRepository,
                              SupplierRepository supplierRepository,
                              ApprovalRuleRepository approvalRuleRepository,
                              RequisitionHistoryRepository requisitionHistoryRepository) {
        super(repository);
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.categoryRepository = categoryRepository;
        this.supplierRepository = supplierRepository;
        this.approvalRuleRepository = approvalRuleRepository;
        this.requisitionHistoryRepository = requisitionHistoryRepository;
    }

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
        boolean hasApprovalRule = approvalRuleRepository
                .findMatchingRule(department.getDepartmentId(), category.getCategoryId(), totalAmount)
                .isPresent();

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
        requisition.setStatus(hasApprovalRule ? RequisitionStatus.PENDING_APPROVAL : RequisitionStatus.SUBMITTED);

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
        return savedRequisition;
    }

    @Transactional
    public Requisition actOnRequisition(Long id, RequisitionActionRequest request, String username) {
        Requisition requisition = findById(id);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

        boolean canApprove = user.getUserRoles().stream()
                .map(userRole -> userRole.getRole().getRoleName())
                .anyMatch(roleName -> {
                    if (roleName == null) return false;
                    String rn = roleName.trim().toLowerCase();
                    return rn.equals("approver") || rn.equals("admin") || rn.equals("manager") || rn.equals("finance");
                });

        if (!canApprove) {
            throw new AccessDeniedException("User is not authorized to approve or reject requisitions");
        }

        if (!RequisitionStatus.PENDING_APPROVAL.equalsIgnoreCase(requisition.getStatus())) {
            throw new BadRequestException("Only requisitions pending approval can be acted upon");
        }

        String action = request.getAction().trim().toUpperCase();
        String step;
        String status;
        if ("APPROVE".equals(action) || "APPROVED".equals(action)) {
            status = RequisitionStatus.APPROVED;
            step = "Approved";
        } else if ("REJECT".equals(action) || "REJECTED".equals(action)) {
            status = RequisitionStatus.REJECTED;
            step = "Rejected";
        } else {
            throw new BadRequestException("Action must be either APPROVE or REJECT");
        }

        requisition.setStatus(status);
        Requisition saved = save(requisition);

        createHistory(saved, user, step, request.getRemarks());
        return saved;
    }

    public List<Requisition> findMyRequisitions(String username) {
        return ((RequisitionRepository) repository).findByCreatedBy_UsernameOrderByCreatedAtDesc(username);
    }

    public List<Requisition> findByStatus(String status) {
        return ((RequisitionRepository) repository).findByStatusOrderByCreatedAtDesc(status);
    }

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
