const crypto = require("crypto");
const generateHashLink = ({
  str = crypto.randomBytes(20).toString("hex"),
  expiryInMins = 15,
  isCache = false,
}) => {
  // Hashing and adding resetPasswordToken to userSchema
  const token = crypto.createHash("sha256").update(str).digest("hex");
  const seconds = Number(expiryInMins) * 60;
  let expiry = seconds;
  if (!isCache) {
    expiry = Date.now() + seconds * 1000;
  }

  return { token, expiry, str };
};
module.exports = generateHashLink;
