package com.enterprise.procurement.repository;

import com.enterprise.procurement.entity.RequisitionHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequisitionHistoryRepository extends JpaRepository<RequisitionHistory, Long> {
}