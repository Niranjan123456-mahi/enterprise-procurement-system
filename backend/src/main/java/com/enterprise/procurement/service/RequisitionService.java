package com.enterprise.procurement.service;

import com.enterprise.procurement.entity.Requisition;
import com.enterprise.procurement.repository.RequisitionRepository;
import org.springframework.stereotype.Service;

@Service
public class RequisitionService extends BaseService<Requisition, Long> {

    public RequisitionService(RequisitionRepository repository) {
        super(repository);
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
