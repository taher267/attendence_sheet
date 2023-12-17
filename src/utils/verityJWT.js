const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = process.env;
const verifyJwt = ({ token, secret = ACCESS_TOKEN_SECRET }) => {
  try {
    const decoded = jwt.verify(token, secret);
    return {
      decoded,
      success: true,
    };
  } catch (e) {
    return {
      message: e.message,
      success: false,
    };
  }
};

module.exports = verifyJwt;
