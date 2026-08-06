package com.enterprise.procurement.service;

import com.enterprise.procurement.entity.Invoice;
import com.enterprise.procurement.entity.Payment;
import com.enterprise.procurement.entity.User;
import com.enterprise.procurement.repository.InvoiceRepository;
import com.enterprise.procurement.repository.PaymentRepository;
import com.enterprise.procurement.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.enterprise.procurement.exception.ResourceNotFoundException;
import com.enterprise.procurement.exception.BadRequestException;
import java.util.List;
import java.time.LocalDateTime;

@Service
public class PaymentService extends BaseService<Payment, Long> {

    private final InvoiceRepository invoiceRepository;
    private final UserRepository userRepository;

    public PaymentService(PaymentRepository repository,
                          InvoiceRepository invoiceRepository,
                          UserRepository userRepository) {
        super(repository);
        this.invoiceRepository = invoiceRepository;
        this.userRepository = userRepository;
    }

    public List<Payment> findByInvoiceId(Long invoiceId) {
        return ((PaymentRepository) repository).findByInvoice_InvoiceId(invoiceId);
    }

    @Transactional
    public Payment createPayment(Payment payment, Long invoiceId, String username) {
        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found"));
        
        if (!"VERIFIED".equalsIgnoreCase(invoice.getStatus())) {
            throw new BadRequestException("Can only pay verified invoices.");
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));
        
        payment.setInvoice(invoice);
        payment.setPaidBy(user);
        payment.setPaymentDate(LocalDateTime.now());
        payment.setStatus("COMPLETED");
        return save(payment);
    }
}
