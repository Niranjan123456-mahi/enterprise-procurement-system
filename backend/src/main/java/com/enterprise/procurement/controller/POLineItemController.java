package com.enterprise.procurement.controller;

import com.enterprise.procurement.entity.POLineItem;
import com.enterprise.procurement.service.POLineItemService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/po-line-items")
@CrossOrigin("*")
public class POLineItemController {

    private final POLineItemService service;

    public POLineItemController(POLineItemService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<POLineItem>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<POLineItem> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<POLineItem> create(@Valid @RequestBody POLineItem item) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(item));
    }

    @PutMapping("/{id}")
    public ResponseEntity<POLineItem> update(@PathVariable Long id,
                                             @Valid @RequestBody POLineItem item) {
        return ResponseEntity.ok(service.update(id, item));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}