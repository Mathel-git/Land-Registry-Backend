const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: [
        "super_admin",
        "view_admin",
        "community_indigene",
        "non_indigene",
      ],
      default: "non_indigene",
    },

    clan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clan",
      default: null,
    },

    hamlet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hamlet",
      default: null,
    },

    family: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Family",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
