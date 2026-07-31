package com.enterprise.procurement.service;

import com.enterprise.procurement.entity.POLineItem;
import com.enterprise.procurement.entity.POReceipt;
import com.enterprise.procurement.entity.PurchaseOrder;
import com.enterprise.procurement.repository.POReceiptRepository;
import com.enterprise.procurement.repository.PurchaseOrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class POReceiptService extends BaseService<POReceipt, Long> {

    private final PurchaseOrderRepository purchaseOrderRepository;

    public POReceiptService(POReceiptRepository repository,
                            PurchaseOrderRepository purchaseOrderRepository) {
        super(repository);
        this.purchaseOrderRepository = purchaseOrderRepository;
    }

    @Override
    @Transactional
    public POReceipt save(POReceipt entity) {
        POReceipt savedReceipt = super.save(entity);
        updatePOStatusOnReceiptChange(savedReceipt.getPurchaseOrder().getPoId());
        return savedReceipt;
    }

    @Transactional
    public POReceipt update(Long id, POReceipt receipt) {
        POReceipt existing = findById(id);
        existing.setPurchaseOrder(receipt.getPurchaseOrder());
        existing.setDescription(receipt.getDescription());
        existing.setQtyReceived(receipt.getQtyReceived());
        existing.setReceivedDate(receipt.getReceivedDate());
        existing.setReceivedBy(receipt.getReceivedBy());
        POReceipt updated = save(existing);
        updatePOStatusOnReceiptChange(updated.getPurchaseOrder().getPoId());
        return updated;
    }

    @Override
    @Transactional
    public void delete(Long id) {
        POReceipt existing = findById(id);
        Long poId = existing.getPurchaseOrder().getPoId();
        super.delete(id);
        updatePOStatusOnReceiptChange(poId);
    }

    @Transactional
    public void updatePOStatusOnReceiptChange(Long poId) {
        PurchaseOrder po = purchaseOrderRepository.findById(poId).orElse(null);
        if (po == null) {
            return;
        }

        List<POReceipt> receipts = ((POReceiptRepository) repository).findByPurchaseOrder_PoId(poId);
        int totalReceived = receipts.stream()
                .mapToInt(r -> r.getQtyReceived() != null ? r.getQtyReceived() : 0)
                .sum();

        int totalOrdered = 0;
        if (po.getLineItems() != null) {
            totalOrdered = po.getLineItems().stream()
                    .mapToInt(item -> item.getOrderedQty() != null ? item.getOrderedQty() : 0)
                    .sum();
            
            for (POLineItem item : po.getLineItems()) {
                int itemReceived = receipts.stream()
                        .filter(r -> r.getDescription() != null && r.getDescription().equalsIgnoreCase(item.getDescription()))
                        .mapToInt(r -> r.getQtyReceived() != null ? r.getQtyReceived() : 0)
                        .sum();
                item.setReceivedQty(itemReceived);
            }
        }

        String newStatus;
        if (receipts.isEmpty() || totalReceived == 0) {
            newStatus = "CREATED";
        } else if (totalOrdered > 0 && totalReceived >= totalOrdered) {
            newStatus = "FULLY_DELIVERED";
        } else {
            newStatus = "PARTIALLY_DELIVERED";
        }

        po.setStatus(newStatus);
        po.setStage(newStatus);
        purchaseOrderRepository.save(po);
    }
}
