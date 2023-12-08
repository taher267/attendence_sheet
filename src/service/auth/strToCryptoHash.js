const crypto = require("crypto");

const strToCryptoHash = ({ str }) => {
  return crypto.createHash("sha256").update(str).digest("hex");
};

module.exports = strToCryptoHash;
