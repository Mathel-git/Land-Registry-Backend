const express = require("express");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

const {
  createClan,
  createHamlet,
  createFamily,
  getClans,
  getHamletsByClan,
  getFamiliesByHamlet,
} = require("../controllers/communityController");

const router = express.Router();

/* ===================== READ ROUTES ===================== */
/* Super Admin + View Admin */

router.get(
  "/clans",
  auth,
  role("super_admin", "view_admin"),
  getClans
);

router.get(
  "/clans/:clanId/hamlets",
  auth,
  role("super_admin", "view_admin"),
  getHamletsByClan
);

router.get(
  "/hamlets/:hamletId/families",
  auth,
  role("super_admin", "view_admin"),
  getFamiliesByHamlet
);

/* ===================== WRITE ROUTES ===================== */
/* Super Admin ONLY */

router.post(
  "/clans",
  auth,
  role("super_admin"),
  createClan
);

router.post(
  "/clans/:clanId/hamlets",
  auth,
  role("super_admin"),
  createHamlet
);

router.post(
  "/hamlets/:hamletId/families",
  auth,
  role("super_admin"),
  createFamily
);

module.exports = router;
