const crypto = require("crypto");
const fs = require("fs");

const algorithm = "aes-256-cbc";

// 🔐 Stable keys from .env
const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
const iv = Buffer.from(process.env.ENCRYPTION_IV, "hex");

function encryptFile(inputPath, outputPath) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  fs.createReadStream(inputPath).pipe(cipher).pipe(fs.createWriteStream(outputPath));
}

function decryptFile(inputPath, outputPath) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  fs.createReadStream(inputPath).pipe(decipher).pipe(fs.createWriteStream(outputPath));
}

module.exports = { encryptFile, decryptFile };
