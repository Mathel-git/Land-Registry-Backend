// routes/auditRoutes.js
const express = require("express");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");
const { getAuditLogs } = require("../controllers/auditController");

const router = express.Router();

/**
 * GET /api/audit-logs
 * - Only accessible by super_admin
 * - Supports optional query parameters for filtering:
 *   - user: filter by user ID
 *   - action: filter by action (CREATE, UPDATE, DELETE)
 *   - startDate / endDate: filter by date range
 */
router.get("/", auth, role("super_admin"), getAuditLogs);

module.exports = router;
