const mongoose = require("mongoose");

const familySchema = new mongoose.Schema({
  name: { type: String, required: true },

  // ✅ Reference the hamlet
  hamlet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hamlet",
    required: true,
  },
});

module.exports = mongoose.model("Family", familySchema);
