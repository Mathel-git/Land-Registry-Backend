const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const landRoutes = require("./routes/landRoutes");
app.use("/api/land", landRoutes);