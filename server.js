const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
console.log("JWT SECRET AT STARTUP:", process.env.JWT_SECRET);

connectDB();

const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://your-frontend.vercel.app"
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


app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
