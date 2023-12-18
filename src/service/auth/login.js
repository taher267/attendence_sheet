const userRepo = require("../../repo/user");
const { badRequest, notFound } = require("../../utils/error");
const { hashMatched } = require("../../utils/hashing");
const { generateToken } = require("../token");
const { REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY } = process.env;
/**
 *
 * @param {email, password} param0
 * @returns {accessToken, refreshToken}
 */
const login = async ({ username, password }) => {
  if (!username || !password) {
    throw badRequest(`Invalid parameters!`);
  }
  const qry = {};

  if (username.includes("@")) {
    qry.email = username;
  } else if (username.includes("+") || !isNaN(parseInt(username))) {
    qry.phone_number = username;
  } else {
    qry.username = username;
  }
  const user = await userRepo.findItem({
    qry,
    select: "+password +refreshToken",
  });

  if (!user) {
    throw notFound("User doesn't exist!");
  } else if (!user?.password) {
    throw badRequest(`Invalid Credentials!`);
  }
  if (user.status === "pending") {
    throw badRequest(`Please verify your account!`);
  } else if (user.status === "inactive") {
    throw badRequest(
      `Your are not eligible to login, please contact with support!`
    );
  }

  const matched = await hashMatched(password, user.password);
  if (!matched) {
    throw badRequest("Invalid Credentials");
  }
  const common = { id: user.id, email: user.email };
  const payload = {
    ...common,
    name: user.name,
    role: user.roles,
  };
  const accessToken = generateToken({ payload });
  let refreshToken = user.refreshToken;
  if (!refreshToken) {
    refreshToken = generateToken({
      payload: common,
      secret: REFRESH_TOKEN_SECRET,
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });
    await userRepo.updateItemById({
      id: user.id,
      updateDate: { refreshToken },
    });
  }
  delete user.password;
  delete user.refreshToken;

  return {
    accessToken,
    refreshToken,
    user,
  };
};

module.exports = login;
