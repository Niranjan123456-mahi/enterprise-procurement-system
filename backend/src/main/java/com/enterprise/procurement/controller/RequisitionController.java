package com.enterprise.procurement.controller;

import com.enterprise.procurement.dto.RequisitionActionRequest;
import com.enterprise.procurement.dto.RequisitionCreateRequest;
import com.enterprise.procurement.entity.Requisition;
import com.enterprise.procurement.service.RequisitionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requisitions")
@CrossOrigin("*")
public class RequisitionController {

    private final RequisitionService service;

    public RequisitionController(RequisitionService service) {
        this.service = service;
    }

    @GetMapping
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
    public ResponseEntity<List<Requisition>> getPendingForMe(Authentication authentication) {
        return ResponseEntity.ok(service.findPendingForApprover(authentication.getName()));
    }

    @PostMapping
    public ResponseEntity<Requisition> create(@Valid @RequestBody RequisitionCreateRequest request,
                                              Authentication authentication) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.create(request, authentication.getName()));
    }

    @PostMapping("/{id}/actions")
    public ResponseEntity<Requisition> actOnRequisition(@PathVariable Long id,
                                                        @Valid @RequestBody RequisitionActionRequest request,
                                                        Authentication authentication) {
        return ResponseEntity.ok(service.actOnRequisition(id, request, authentication.getName()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Requisition> update(@PathVariable Long id,
                                              @Valid @RequestBody Requisition requisition) {
        return ResponseEntity.ok(service.update(id, requisition));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}