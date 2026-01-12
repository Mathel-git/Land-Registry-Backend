const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();

const app = express(); // ✅ THIS WAS MISSING

connectDB();

// ✅ CORS CONFIG
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://land-registry-frontend-ten.vercel.app", // replace later
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require("./routes/authRoutes");
const landRoutes = require("./routes/landRoutes");
const auditRoutes = require("./routes/auditRoutes");
const communityRoutes = require("./routes/communityRoutes");
const familyRoutes = require("./routes/familyRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/land", landRoutes);
app.use("/api/audit-logs", auditRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/families", familyRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Land Registry API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
