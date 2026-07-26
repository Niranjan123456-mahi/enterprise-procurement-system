package com.enterprise.procurement.repository;

import com.enterprise.procurement.entity.ApprovalRule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApprovalRuleRepository extends JpaRepository<ApprovalRule, Long> {
}