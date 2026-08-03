package com.enterprise.procurement.controller;

import com.enterprise.procurement.entity.PurchaseOrder;
import com.enterprise.procurement.exception.BadRequestException;
import com.enterprise.procurement.service.PurchaseOrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;

@RestController
@RequestMapping("/api/purchase-orders")
@CrossOrigin("*")
@Tag(name = "Purchase Orders", description = "Endpoints for managing Purchase Orders")
@SecurityRequirement(name = "bearerAuth")
public class PurchaseOrderController {

    private final PurchaseOrderService service;

    public PurchaseOrderController(PurchaseOrderService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Get all purchase orders", description = "Retrieve a list of all purchase orders")
    @PreAuthorize("hasAnyRole('Admin', 'Receiver', 'Finance')")
    public ResponseEntity<List<PurchaseOrder>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get purchase order by ID", description = "Retrieve details of a specific purchase order by ID")
    @PreAuthorize("hasAnyRole('Admin', 'Receiver', 'Finance')")
    public ResponseEntity<PurchaseOrder> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    @Operation(summary = "Manual purchase order creation (Disabled)", description = "Manual PO creation is disabled. POs are created automatically when requisitions are approved.")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<PurchaseOrder> create(@Valid @RequestBody PurchaseOrder order) {
        throw new BadRequestException("Manual Purchase Order creation is not allowed. Purchase Orders are generated automatically upon requisition approval.");
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update purchase order", description = "Update details of an existing purchase order")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<PurchaseOrder> update(@PathVariable Long id,
                                                @Valid @RequestBody PurchaseOrder order) {
        return ResponseEntity.ok(service.update(id, order));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete purchase order", description = "Delete a purchase order by ID")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}