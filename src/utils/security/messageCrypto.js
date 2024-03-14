const { log } = require("console");
const { pbkdf2Sync, randomBytes } = require("crypto");

const generateSalt = () => {
  return randomBytes(16).toString("hex");
};

const hashPassword = (plainText, salt) => {
  return pbkdf2Sync(plainText, salt, 9999, 64, "sha512").toString("hex");
};

const verifyPassword = (hashedPassword, attemptingPassword, salt) => {
  return hashedPassword === hashPassword(attemptingPassword, salt);
};

module.exports = { generateSalt, verifyPassword, hashPassword };
