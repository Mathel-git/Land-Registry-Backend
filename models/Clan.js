const mongoose = require("mongoose");

const clanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
    },

    hamletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hamlet",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Clan", clanSchema);
