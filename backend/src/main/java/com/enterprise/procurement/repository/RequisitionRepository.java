package com.enterprise.procurement.repository;

import com.enterprise.procurement.entity.Requisition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequisitionRepository extends JpaRepository<Requisition, Long> {
}