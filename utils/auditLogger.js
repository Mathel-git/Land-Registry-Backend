const AuditLog = require("../models/AuditLog");

const logAction = async ({ userId, action, resource, ip }) => {
  try {
    await AuditLog.create({
      user: userId,
      action,
      resource,
      ipAddress: ip
    });
  } catch (err) {
    console.error("Audit log failed:", err.message);
  }
};

module.exports = logAction;
