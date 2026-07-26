package com.enterprise.procurement.repository;

import com.enterprise.procurement.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}