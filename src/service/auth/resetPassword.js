const { badRequest, notFound, serverError } = require("../../utils/error");
const strToCryptoHash = require("./strToCryptoHash");
const userRepo = require("../../repo/user");
// const bcrypt = require("bcrypt");
const verifyJwt = require("../../utils/verityJWT");
const cache = require("../../cache");
const { generateHash } = require("../../utils/hashing");
const { generateToken } = require("../token");
const { FORGER_PASSWORD_SECRET, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY } =
  process.env;
const resetPassword = async ({ hashToken, newPassword, confirmPassword }) => {
  if (!FORGER_PASSWORD_SECRET) {
    throw serverError();
  }

  if (!hashToken || !newPassword || !confirmPassword) {
    throw badRequest(`Please provide required parameters!`);
  } else if (newPassword !== confirmPassword) {
    throw badRequest("Password does not password", 400);
  }

  const verify = verifyJwt({
    secret: FORGER_PASSWORD_SECRET,
    token: hashToken,
  });
  if (!verify.success) {
    throw badRequest(verify.message);
  }
  const { decoded } = verify;
  const hash = strToCryptoHash({ str: decoded.hash });
  const doesExistCache = cache.get(hash);
  const email = decoded?.email;
  if (!doesExistCache || !email || doesExistCache !== email) {
    throw badRequest(`Reset password token invalid or expired!`);
  }
  const user = await userRepo.findItem({
    qry: { email },
  });

  if (!user) {
    throw notFound(`User doesn't exist!`);
  } else if (user.status !== "active") {
    cache.del(hash);
    throw badRequest(
      `Inactive account, Contact us with support to active your account!`
    );
  }
  const password = await generateHash(newPassword);
  const payload = { id: user.id, email };

  const refreshToken = generateToken({
    payload,
    secret: REFRESH_TOKEN_SECRET,
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
  await userRepo.updateItemById({
    id: user.id,
    updateData: { refreshToken, password },
  });

  return {
    code: 200,
    refreshToken,
  };
};
module.exports = resetPassword;
