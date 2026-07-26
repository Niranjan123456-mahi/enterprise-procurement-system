package com.enterprise.procurement.service;

import com.enterprise.procurement.entity.AuditLog;
import com.enterprise.procurement.repository.AuditLogRepository;
import org.springframework.stereotype.Service;

@Service
public class AuditLogService extends BaseService<AuditLog, Long> {

    public AuditLogService(AuditLogRepository repository) {
        super(repository);
    }

    public AuditLog update(Long id, AuditLog auditLog) {
        AuditLog existing = findById(id);
        existing.setUser(auditLog.getUser());
        existing.setModule(auditLog.getModule());
        existing.setAction(auditLog.getAction());
        existing.setEntityName(auditLog.getEntityName());
        existing.setEntityId(auditLog.getEntityId());
        existing.setRemarks(auditLog.getRemarks());
        return save(existing);
    }
}
