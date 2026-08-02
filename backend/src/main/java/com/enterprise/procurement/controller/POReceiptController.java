package com.enterprise.procurement.controller;

import com.enterprise.procurement.entity.POReceipt;
import com.enterprise.procurement.service.POReceiptService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/po-receipts")
@CrossOrigin("*")
@Tag(name = "PO Receipts", description = "Endpoints for managing goods receipt notes and updating PO delivery statuses")
@SecurityRequirement(name = "bearerAuth")
public class POReceiptController {

    private final POReceiptService service;

    public POReceiptController(POReceiptService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Get all PO receipts", description = "Retrieve a list of all purchase order receipts")
    public ResponseEntity<List<POReceipt>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get PO receipt by ID", description = "Retrieve details of a specific receipt by ID")
    public ResponseEntity<POReceipt> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    @Operation(summary = "Create PO receipt", description = "Record goods received against a PO and automatically update PO delivery status (CREATED, PARTIALLY_DELIVERED, FULLY_DELIVERED)")
    public ResponseEntity<POReceipt> create(@Valid @RequestBody POReceipt receipt) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(receipt));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update PO receipt", description = "Update details of an existing receipt and recalculate PO delivery status")
    public ResponseEntity<POReceipt> update(@PathVariable Long id,
                                           @Valid @RequestBody POReceipt receipt) {
        return ResponseEntity.ok(service.update(id, receipt));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete PO receipt", description = "Delete a receipt and recalculate PO delivery status")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}