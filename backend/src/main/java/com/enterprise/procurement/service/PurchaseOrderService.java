package com.enterprise.procurement.service;

import com.enterprise.procurement.entity.PurchaseOrder;
import com.enterprise.procurement.repository.PurchaseOrderRepository;
import org.springframework.stereotype.Service;

@Service
public class PurchaseOrderService extends BaseService<PurchaseOrder, Long> {

    public PurchaseOrderService(PurchaseOrderRepository repository) {
        super(repository);
    }

    public PurchaseOrder update(Long id, PurchaseOrder purchaseOrder) {
        PurchaseOrder existing = findById(id);
        existing.setPoNumber(purchaseOrder.getPoNumber());
        existing.setRequisition(purchaseOrder.getRequisition());
        existing.setSupplier(purchaseOrder.getSupplier());
        existing.setCreatedDate(purchaseOrder.getCreatedDate());
        existing.setStage(purchaseOrder.getStage());
        existing.setStatus(purchaseOrder.getStatus());
        return save(existing);
    }
}
