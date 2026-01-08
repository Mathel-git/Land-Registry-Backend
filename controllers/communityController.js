const Clan = require("../models/Clan");
const Hamlet = require("../models/Hamlet");
const Family = require("../models/Family");
const logAction = require("../utils/logAction");

/* ===================== CLANS ===================== */

exports.getClans = async (req, res) => {
  const clans = await Clan.find().sort({ createdAt: -1 });
  res.json(clans);
};

exports.createClan = async (req, res) => {
  try {
    const clan = await Clan.create({ name: req.body.name });

    await logAction({
      user: req.user.id,
      role: req.user.role,
      action: "CREATE",
      entityType: "Clan",
      entityId: clan._id,
      description: `Created clan: ${clan.name}`,
    });

    res.status(201).json(clan);
  } catch {
    res.status(500).json({ message: "Failed to create clan" });
  }
};

/* ===================== HAMLETS ===================== */

exports.getHamletsByClan = async (req, res) => {
  try {
    const hamlets = await Hamlet.find({ clan: req.params.clanId });

    const enriched = await Promise.all(
      hamlets.map(async (h) => ({
        _id: h._id,
        name: h.name,
        familyCount: await Family.countDocuments({ hamlet: h._id }),
      }))
    );

    res.json(enriched);
  } catch {
    res.status(500).json({ message: "Failed to fetch hamlets" });
  }
};

exports.createHamlet = async (req, res) => {
  try {
    const hamlet = await Hamlet.create({
      name: req.body.name,
      clan: req.params.clanId,
    });

    await logAction({
      user: req.user.id,
      role: req.user.role,
      action: "CREATE",
      entityType: "Hamlet",
      entityId: hamlet._id,
      description: `Created hamlet: ${hamlet.name}`,
    });

    res.status(201).json(hamlet);
  } catch {
    res.status(500).json({ message: "Failed to create hamlet" });
  }
};

/* ===================== FAMILIES ===================== */

exports.getFamiliesByHamlet = async (req, res) => {
  const families = await Family.find({ hamlet: req.params.hamletId });
  res.json(families);
};

exports.createFamily = async (req, res) => {
  try {
    const family = await Family.create({
      name: req.body.name,
      hamlet: req.params.hamletId,
    });

    await logAction({
      user: req.user.id,
      role: req.user.role,
      action: "CREATE",
      entityType: "Family",
      entityId: family._id,
      description: `Created family: ${family.name}`,
    });

    res.status(201).json(family);
  } catch {
    res.status(500).json({ message: "Failed to create family" });
  }
};
