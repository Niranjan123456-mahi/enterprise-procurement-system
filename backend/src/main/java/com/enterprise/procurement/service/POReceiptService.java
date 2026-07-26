package com.enterprise.procurement.service;

import com.enterprise.procurement.entity.POReceipt;
import com.enterprise.procurement.repository.POReceiptRepository;
import org.springframework.stereotype.Service;

@Service
public class POReceiptService extends BaseService<POReceipt, Long> {

    public POReceiptService(POReceiptRepository repository) {
        super(repository);
    }

    public POReceipt update(Long id, POReceipt receipt) {
        POReceipt existing = findById(id);
        existing.setPurchaseOrder(receipt.getPurchaseOrder());
        existing.setDescription(receipt.getDescription());
        existing.setQtyReceived(receipt.getQtyReceived());
        existing.setReceivedDate(receipt.getReceivedDate());
        existing.setReceivedBy(receipt.getReceivedBy());
        return save(existing);
    }
}
