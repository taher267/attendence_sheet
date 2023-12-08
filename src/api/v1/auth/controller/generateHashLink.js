const crypto = require("crypto");
const generateHashLink = ({
  str = crypto.randomBytes(20).toString("hex"),
  expiryInMins = 15,
}) => {
  // Hashing and adding resetPasswordToken to userSchema
  const token = crypto.createHash("sha256").update(str).digest("hex");

  const expiry = Date.now() + expiryInMins * 60 * 1000;

  return { token, expiry, str };
};
module.exports = generateHashLink;
