const User = require("../models/User"); // ✅ FIXED case
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logAction = require("../utils/auditLogger");

// ---------------- USER REGISTRATION ----------------
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, clan, hamlet, family } = req.body;

    // 🔒 Block admin role registration
    if (role === "super_admin" || role === "view_admin") {
      return res.status(403).json({
        message: "Admin roles cannot be self-registered",
      });
    }

    // 🔍 Validate community indigene hierarchy
    if (role === "community_indigene") {
      if (!clan || !hamlet || !family) {
        return res.status(400).json({
          message: "Clan, Hamlet, and Family are required for community indigene",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "non_indigene",
      clan: role === "community_indigene" ? clan : null,
      hamlet: role === "community_indigene" ? hamlet : null,
      family: role === "community_indigene" ? family : null,
    });

    res.status(201).json({
      message: "Registration successful",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ---------------- USER LOGIN ----------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Audit log (excellent practice)
    await logAction({
      userId: user._id,
      action: "LOGIN",
      resource: "User",
      ip: req.ip,
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
