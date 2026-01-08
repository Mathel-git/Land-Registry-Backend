const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ---------------- CREATE VIEW ADMIN ----------------
exports.createViewAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
      name,
      email,
      password: hashedPassword,
      role: "view_admin",
    });

    await admin.save();

    res.status(201).json({
      message: "View admin created successfully",
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
