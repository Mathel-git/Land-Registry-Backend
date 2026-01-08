const express = require("express");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

const {
  createFamily,
  getFamilies,
} = require("../controllers/familyController");

const router = express.Router();

// Super Admin only
router.post(
  "/",
  auth,
  role("super_admin"),
  createFamily
);

router.get(
  "/",
  auth,
  role("super_admin"),
  getFamilies
);

module.exports = router;
