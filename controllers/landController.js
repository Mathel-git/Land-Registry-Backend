const Land = require("../models/Land");
const fs = require("fs");
const path = require("path");
const { encryptFile, decryptFile } = require("../utils/cryptoFile"); // ✅ ADD
const logAction = require("../utils/auditLogger");

// ------------------- Upload Land Document -------------------
exports.uploadLand = async (req, res) => {
  try {
    const { title, ownerName, documentType } = req.body;

    // 🔐 Allocation document is REQUIRED
    if (!req.files?.allocationDocument) {
      return res.status(400).json({
        message: "Community allocation document is required",
      });
    }

    // 🔹 Allocation document (single)
    const allocationFile = req.files.allocationDocument[0];

    // 🔹 Other documents (optional, multiple)
    const otherDocs =
      req.files.otherDocuments?.map((file) => ({
        filename: file.originalname,
        path: file.path,
      })) || [];

    const land = new Land({
      title,
      ownerName,
      documentType,

      allocationDocument: {
        filename: allocationFile.originalname,
        path: allocationFile.path,
      },

      otherDocuments: otherDocs,

      uploadedBy: req.user.id,
    });

    await land.save();

    res.status(201).json({
      message: "Land documents uploaded successfully",
      land,
    });
  } catch (error) {
    console.error("Upload land error:", error);
    res.status(500).json({
      message: "Server error while uploading land",
    });
  }
};

// ------------------- Get All Lands -------------------
exports.getAllLands = async (req, res) => {
  try {
    let lands = await Land.find()
      .populate("uploadedBy", "name role")
      .populate("family", "name");

    // Hide owner info from non-indigenes
    if (req.user.role === "non_indigene") {
      lands = lands.map(l => ({
        _id: l._id,
        title: l.title,
        documentType: l.documentType,
        createdAt: l.createdAt
      }));
    }

    res.json(lands);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------------- Download Land Document (SUPER_ADMIN ONLY) -------------------
exports.downloadLand = async (req, res) => {
  try {
    // 🔒 Only super_admin can download
    if (req.user.role !== "super_admin") {
      return res.status(403).json({
        message: "Only super admin can download documents"
      });
    }

    const land = await Land.findById(req.params.id);
    if (!land) {
      return res.status(404).json({ message: "Document not found" });
    }

    const encryptedPath = land.documentPath;

    if (!fs.existsSync(encryptedPath)) {
      return res.status(404).json({ message: "Encrypted file missing" });
    }

    // Temporary decrypted file
    const tempPath = encryptedPath.replace(".enc", "");

    // 🔓 Decrypt
    await decryptFile(encryptedPath, tempPath);

    // Log action
    await logAction({
      userId: req.user.id,
      action: "DOWNLOAD_LAND",
      resource: land._id,
      ip: req.ip
    });

    // 📤 Send file
    res.download(tempPath, err => {
      // 🧹 Clean up decrypted file
      fs.unlink(tempPath, () => {});
      if (err) console.error(err);
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
