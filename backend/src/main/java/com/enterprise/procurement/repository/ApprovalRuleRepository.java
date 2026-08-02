package com.enterprise.procurement.repository;

import com.enterprise.procurement.entity.ApprovalRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.Optional;

public interface ApprovalRuleRepository extends JpaRepository<ApprovalRule, Long> {

    @Query("SELECT r FROM ApprovalRule r WHERE r.department.departmentId = :deptId " +
           "AND r.category.categoryId = :catId AND r.isActive = true " +
           "AND :amount >= r.minAmount AND :amount <= r.maxAmount")
    Optional<ApprovalRule> findMatchingRule(
            @Param("deptId") Long departmentId,
            @Param("catId") Long categoryId,
            @Param("amount") BigDecimal amount
    );
}