package com.enterprise.procurement.repository;

import com.enterprise.procurement.entity.Requisition;
import com.enterprise.procurement.entity.RequisitionHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RequisitionHistoryRepository extends JpaRepository<RequisitionHistory, Long> {

    List<RequisitionHistory> findByRequisition(Requisition requisition);
}