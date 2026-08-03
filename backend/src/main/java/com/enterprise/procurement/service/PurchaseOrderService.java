package com.enterprise.procurement.service;

import com.enterprise.procurement.entity.POLineItem;
import com.enterprise.procurement.entity.PurchaseOrder;
import com.enterprise.procurement.entity.Requisition;
import com.enterprise.procurement.entity.RequisitionStatus;
import com.enterprise.procurement.repository.PurchaseOrderRepository;
import com.enterprise.procurement.repository.RequisitionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PurchaseOrderService extends BaseService<PurchaseOrder, Long> {

    private final RequisitionRepository requisitionRepository;

    public PurchaseOrderService(PurchaseOrderRepository repository, RequisitionRepository requisitionRepository) {
        super(repository);
        this.requisitionRepository = requisitionRepository;
    }

    @Transactional
    public PurchaseOrder createFromRequisition(Requisition requisition) {
        String poNumber = "PO-" + requisition.getRequisitionNumber().replace("REQ-", "");
        
        PurchaseOrder po = PurchaseOrder.builder()
                .poNumber(poNumber)
                .requisition(requisition)
                .supplier(requisition.getSupplier())
                .createdDate(LocalDate.now())
                .stage("CREATED")
                .status("CREATED")
                .build();

        if (requisition.getLineItems() != null && !requisition.getLineItems().isEmpty()) {
            List<POLineItem> poLineItems = requisition.getLineItems().stream()
                    .map(reqItem -> POLineItem.builder()
                            .purchaseOrder(po)
                            .description(reqItem.getDescription())
                            .orderedQty(reqItem.getQuantity())
                            .receivedQty(0)
                            .unitPrice(reqItem.getUnitPrice())
                            .build())
                    .collect(Collectors.toList());
            po.setLineItems(poLineItems);
        }

        PurchaseOrder savedPo = repository.save(po);

        requisition.setStatus(RequisitionStatus.ORDER_CREATED);
        requisitionRepository.save(requisition);

        return savedPo;
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
