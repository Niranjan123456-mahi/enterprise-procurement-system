package com.enterprise.procurement.repository;

import com.enterprise.procurement.entity.POReceipt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface POReceiptRepository extends JpaRepository<POReceipt, Long> {
}