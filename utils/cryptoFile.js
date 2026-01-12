const crypto = require("crypto");
const fs = require("fs");

const algorithm = "aes-256-cbc";

const encryptionKey = process.env.ENCRYPTION_KEY;
const encryptionIv = process.env.ENCRYPTION_IV;

if (!encryptionKey || !encryptionIv) {
  throw new Error(
    "ENCRYPTION_KEY or ENCRYPTION_IV missing in environment variables"
  );
}

const key = Buffer.from(encryptionKey, "hex");
const iv = Buffer.from(encryptionIv, "hex");

if (key.length !== 32) {
  throw new Error("ENCRYPTION_KEY must be 32 bytes (64 hex characters)");
}

if (iv.length !== 16) {
  throw new Error("ENCRYPTION_IV must be 16 bytes (32 hex characters)");
}

function encryptFile(inputPath, outputPath) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  fs.createReadStream(inputPath)
    .pipe(cipher)
    .pipe(fs.createWriteStream(outputPath));
}

function decryptFile(inputPath, outputPath) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  fs.createReadStream(inputPath)
    .pipe(decipher)
    .pipe(fs.createWriteStream(outputPath));
}

module.exports = { encryptFile, decryptFile };
