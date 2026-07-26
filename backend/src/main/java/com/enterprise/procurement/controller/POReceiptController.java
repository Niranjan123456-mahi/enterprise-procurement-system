package com.enterprise.procurement.controller;

import com.enterprise.procurement.entity.POReceipt;
import com.enterprise.procurement.service.POReceiptService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/po-receipts")
@CrossOrigin("*")
public class POReceiptController {

    private final POReceiptService service;

    public POReceiptController(POReceiptService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<POReceipt>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<POReceipt> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<POReceipt> create(@Valid @RequestBody POReceipt receipt) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(receipt));
    }

    @PutMapping("/{id}")
    public ResponseEntity<POReceipt> update(@PathVariable Long id,
                                           @Valid @RequestBody POReceipt receipt) {
        return ResponseEntity.ok(service.update(id, receipt));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}