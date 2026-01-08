const express = require("express");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");
const { createViewAdmin } = require("../controllers/adminController");

const router = express.Router();

router.post(
  "/create-view-admin",
  auth,
  role("super_admin"),
  createViewAdmin
);

module.exports = router;
