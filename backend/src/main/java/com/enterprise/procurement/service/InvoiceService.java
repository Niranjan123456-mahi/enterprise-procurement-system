package com.enterprise.procurement.service;

import com.enterprise.procurement.entity.Invoice;
import com.enterprise.procurement.entity.PurchaseOrder;
import com.enterprise.procurement.entity.User;
import com.enterprise.procurement.repository.InvoiceRepository;
import com.enterprise.procurement.repository.PurchaseOrderRepository;
import com.enterprise.procurement.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.enterprise.procurement.exception.ResourceNotFoundException;
import java.util.List;

@Service
public class InvoiceService extends BaseService<Invoice, Long> {

    private final PurchaseOrderRepository purchaseOrderRepository;
    private final UserRepository userRepository;

    public InvoiceService(InvoiceRepository repository,
                          PurchaseOrderRepository purchaseOrderRepository,
                          UserRepository userRepository) {
        super(repository);
        this.purchaseOrderRepository = purchaseOrderRepository;
        this.userRepository = userRepository;
    }

    public List<Invoice> findByStatus(String status) {
        return ((InvoiceRepository) repository).findByStatus(status);
    }

    public List<Invoice> findByPoId(Long poId) {
        return ((InvoiceRepository) repository).findByPurchaseOrder_PoId(poId);
    }

    @Transactional
    public Invoice uploadInvoice(Invoice invoice, Long poId) {
        PurchaseOrder po = purchaseOrderRepository.findById(poId)
                .orElseThrow(() -> new ResourceNotFoundException("Purchase Order not found"));
        invoice.setPurchaseOrder(po);
        invoice.setStatus("PENDING");
        return save(invoice);
    }

    @Transactional
    public Invoice verifyInvoice(Long invoiceId, String username, String action) {
        Invoice invoice = findById(invoiceId);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));
        
        if ("VERIFY".equalsIgnoreCase(action)) {
            invoice.setStatus("VERIFIED");
            invoice.setVerifiedBy(user);
        } else if ("REJECT".equalsIgnoreCase(action)) {
            invoice.setStatus("REJECTED");
            invoice.setVerifiedBy(user);
        } else {
            throw new IllegalArgumentException("Action must be VERIFY or REJECT");
        }
        return save(invoice);
    }
}
