const bcrypt = require("bcrypt");

const generateHash = async (payload, saltRound = 10) => {
  const salt = await bcrypt.genSalt(saltRound);
  return bcrypt.hash(payload, salt);
};

const hashMatched = async (raw, hash) => {
  if (!raw || !hash) {
    throw new Error(`Please provide raw or hash`);
  }
  const result = await bcrypt.compare(raw, hash);
  return result;
};

module.exports = {
  generateHash,
  hashMatched,
};

// generateHash("J").then(console.log).then(console.error);
