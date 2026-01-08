const express = require("express");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");
const upload = require("../middlewares/upload");

const {
  uploadLand,
  getAllLands,
  downloadLand,
} = require("../controllers/landController");

const router = express.Router();

// Upload land documents
// ✅ Allowed roles
router.post(
  "/",
  auth,
  role("super_admin", "view_admin", "community_indigene", "non_indigene"),
  upload.fields([
    { name: "allocationDocument", maxCount: 1 },
    { name: "otherDocuments", maxCount: 5 },
  ]),
  uploadLand
);

// Get all lands
router.get("/", auth, getAllLands);

// Download land document
// ✅ Only super_admin allowed (handled in controller)
router.get("/:id/download", auth, downloadLand);

module.exports = router;
