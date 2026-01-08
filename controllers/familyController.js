const Family = require("../models/Family");
const Hamlet = require("../models/Hamlet");

// ---------------- CREATE FAMILY ----------------
exports.createFamily = async (req, res) => {
  try {
    const { name, hamlet } = req.body; // <-- Expect "hamlet" from request, matches schema

    if (!hamlet) {
      return res.status(400).json({ message: "hamlet (hamlet ID) is required" });
    }

    // Check if the hamlet exists
    const hamletExists = await Hamlet.findById(hamlet);
    if (!hamletExists) {
      return res.status(404).json({ message: "Hamlet not found" });
    }

    const family = new Family({
      name,
      hamlet, // assign directly to match schema
    });

    await family.save();

    res.status(201).json({
      message: "Family created successfully",
      family,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------- GET ALL FAMILIES ----------------
exports.getFamilies = async (req, res) => {
  try {
    const families = await Family.find()
      .populate("hamlet", "name") // populate hamlet name for readability
      .sort({ createdAt: -1 });

    res.json(families);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
