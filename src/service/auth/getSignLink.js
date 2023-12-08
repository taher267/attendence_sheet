const jwt = require("jsonwebtoken");
const { REGISTER_LINK_SECRET, REGISTER_LINK_EXPIRY } = process.env;
const getSignLink = ({
  payload = {},
  expiry = REGISTER_LINK_EXPIRY,
  secret = REGISTER_LINK_SECRET,
}) => {
  const iat = Math.trunc(Date.now() / 1000);
  const exp = iat + Number(expiry);
  const sign = jwt.sign({ ...payload, iat, exp }, secret);
  return {
    sign,
    exp,
    // expInSec
  };
};

module.exports = getSignLink;
