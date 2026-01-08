const AuditLog = require("../models/AuditLog");

const logAction = async ({
  user,
  role,
  action,
  entityType,
  entityId,
  description,
}) => {
  try {
    await AuditLog.create({
      user,
      role,
      action,
      entityType,
      entityId,
      description,
    });
  } catch (err) {
    console.error("Audit log failed:", err.message);
  }
};

module.exports = logAction;
