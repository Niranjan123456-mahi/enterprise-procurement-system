package com.enterprise.procurement.repository;

import com.enterprise.procurement.entity.RequisitionLineItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequisitionLineItemRepository extends JpaRepository<RequisitionLineItem, Long> {
}