const mongoose = require("mongoose");

const hamletSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    // ✅ Use 'clan' as the field name
    clan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clan",
      required: true,
      unique: true, // 🔒 ONE hamlet per clan
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hamlet", hamletSchema);
