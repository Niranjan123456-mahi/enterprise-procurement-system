package com.enterprise.procurement.controller;

import com.enterprise.procurement.entity.Requisition;
import com.enterprise.procurement.service.RequisitionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<Requisition>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Requisition> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<Requisition> create(@Valid @RequestBody Requisition requisition) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(requisition));
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