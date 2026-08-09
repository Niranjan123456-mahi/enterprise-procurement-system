package com.enterprise.procurement.controller;

import com.enterprise.procurement.dto.RequisitionActionRequest;
import com.enterprise.procurement.dto.RequisitionApprovalRequest;
import com.enterprise.procurement.dto.RequisitionCreateRequest;
import com.enterprise.procurement.entity.Requisition;
import com.enterprise.procurement.service.RequisitionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;
import com.enterprise.procurement.dto.TimelineEvent;
import com.enterprise.procurement.service.AuditLogService;

@RestController
@RequestMapping("/api/requisitions")
@CrossOrigin("*")
public class RequisitionController {

    private final RequisitionService service;

    public RequisitionController(RequisitionService service) {
        this.service = service;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('Admin', 'Finance')")
    public ResponseEntity<List<Requisition>> getAll(@RequestParam(required = false) String status) {
        if (status != null && !status.isBlank()) {
            return ResponseEntity.ok(service.findByStatus(status));
        }
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/my")
    public ResponseEntity<List<Requisition>> getMyRequests(Authentication authentication) {
        return ResponseEntity.ok(service.findMyRequisitions(authentication.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Requisition> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/pending")
    @PreAuthorize("hasAnyRole('Admin', 'Manager', 'Finance')")
    public ResponseEntity<List<Requisition>> getPendingForMe(Authentication authentication) {
        return ResponseEntity.ok(service.findPendingForApprover(authentication.getName()));
    }

    @PostMapping
    public ResponseEntity<Requisition> create(@Valid @RequestBody RequisitionCreateRequest request,
                                              Authentication authentication) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.create(request, authentication.getName()));
    }

    @GetMapping("/{id}/timeline")
    public ResponseEntity<List<TimelineEvent>> getTimeline(@PathVariable Long id) {
        return ResponseEntity.ok(service.getRequisitionTimeline(id));
    }

    @GetMapping("/approvals/history")
    @PreAuthorize("hasAnyRole('Admin', 'Manager', 'Finance')")
    public ResponseEntity<List<Requisition>> getMyApprovalsHistory(Authentication authentication) {
        return ResponseEntity.ok(service.findMyApprovals(authentication.getName()));
    }

    @GetMapping("/preview-approval")
    public ResponseEntity<List<String>> previewApprovalChain(
            @RequestParam Long categoryId,
            @RequestParam java.math.BigDecimal amount,
            Authentication authentication) {
        return ResponseEntity.ok(service.getApprovalChainNames(categoryId, amount, authentication.getName()));
    }

    @PostMapping("/{id}/actions")
    @PreAuthorize("hasAnyRole('Admin', 'Manager', 'Finance')")
    public ResponseEntity<Requisition> actOnRequisition(@PathVariable Long id,
                                                        @Valid @RequestBody RequisitionActionRequest request,
                                                        Authentication authentication) {
        return ResponseEntity.ok(service.actOnRequisition(id, request, authentication.getName()));
    }

    @RequestMapping(value = "/{id}/approve", method = {RequestMethod.POST, RequestMethod.PUT})
    @PreAuthorize("hasAnyRole('Admin', 'Manager', 'Finance')")
    public ResponseEntity<Requisition> approve(@PathVariable Long id,
                                               @RequestBody(required = false) RequisitionApprovalRequest request,
                                               Authentication authentication) {
        RequisitionActionRequest actionReq = new RequisitionActionRequest();
        actionReq.setAction("APPROVE");
        if (request != null) {
            actionReq.setRemarks(request.getRemarks());
        }
        return ResponseEntity.ok(service.actOnRequisition(id, actionReq, authentication.getName()));
    }

    @RequestMapping(value = "/{id}/reject", method = {RequestMethod.POST, RequestMethod.PUT})
    @PreAuthorize("hasAnyRole('Admin', 'Manager', 'Finance')")
    public ResponseEntity<Requisition> reject(@PathVariable Long id,
                                              @RequestBody(required = false) RequisitionApprovalRequest request,
                                              Authentication authentication) {
        RequisitionActionRequest actionReq = new RequisitionActionRequest();
        actionReq.setAction("REJECT");
        if (request != null) {
            actionReq.setRemarks(request.getRemarks());
        }
        return ResponseEntity.ok(service.actOnRequisition(id, actionReq, authentication.getName()));
    }

    @PatchMapping("/{id}/supplier")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Requisition> updateSupplier(@PathVariable Long id, 
                                                      @RequestBody java.util.Map<String, Long> payload, 
                                                      Authentication authentication) {
        Long supplierId = payload.get("supplierId");
        if (supplierId == null) {
            throw new IllegalArgumentException("Supplier ID is required");
        }
        return ResponseEntity.ok(service.updateSupplier(id, supplierId, authentication.getName()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Requisition> update(@PathVariable Long id,
                                              @Valid @RequestBody Requisition requisition) {
        return ResponseEntity.ok(service.update(id, requisition));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}