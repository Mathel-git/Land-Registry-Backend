const mongoose = require("mongoose");

const landSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    ownerName: {
      type: String,
      required: true,
    },

    // ✅ Community allocation paper (single, required logically)
    allocationDocument: {
      filename: { type: String },
      path: { type: String },
    },

    // ✅ Other supporting documents (multiple)
    otherDocuments: [
      {
        filename: { type: String },
        path: { type: String },
      },
    ],

    documentType: {
      type: String,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    family: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Family",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Land", landSchema);
