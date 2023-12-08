const { serverError, badRequest } = require("../../utils/error");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY } = process.env;
const generateToken = ({
  payload,
  algorithm = "HS256",
  secret = ACCESS_TOKEN_SECRET,
  expiresIn = ACCESS_TOKEN_EXPIRY,
}) => {
  try {
    return jwt.sign(payload, secret, {
      algorithm,
      expiresIn,
    });
  } catch (e) {
    console.log("[JWT]", e);
    throw serverError();
  }
};

const decodeToken = ({ token, algorithm = "HS256" }) => {
  try {
    return jwt.decode(token, { algorithms: [algorithm] });
  } catch (e) {
    console.log("[JWT]", e);
    throw serverError();
  }
};

const verifyToken = ({
  token,
  algorithm = "HS256",
  secret = ACCESS_TOKEN_SECRET,
}) => {
  if (!secret) {
    throw serverError();
  }
  try {
    return jwt.verify(token, secret, { algorithms: [algorithm] });
  } catch (e) {
    console.log("[JWT]", e);
    const errMsg = e.message;
    let msg = errMsg;
    if (errMsg === "invalid signature" || errMsg === "jwt malformed") {
      msg = "Invalid auth token";
    }
    throw badRequest(msg);
  }
};

module.exports = {
  generateToken,
  decodeToken,
  verifyToken,
};
