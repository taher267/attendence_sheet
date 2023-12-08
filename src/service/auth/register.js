const hashing = require("../../utils/hashing");
const token = require("../token");
const userRepo = require("../../repo/user");
const { badRequest, serverError } = require("../../utils/error");
const { REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY } = process.env;
/**
 *
 * @param { name, email, password, username, phone_number } param0
 * @returns {user, accessToken, refreshToken}
 */
const register = async ({ name, email, password, username, phone_number }) => {
  if (!REFRESH_TOKEN_SECRET || !REFRESH_TOKEN_EXPIRY) {
    throw serverError();
  }
  if (!name || !email || !password) {
    throw badRequest(`Invalid parameters!`);
  }
  // new user object
  const newObj = {
    name,
    email,
  };

  const qry = [{ email }];

  if (phone_number) {
    qry.push({ phone_number });
    newObj.phone_number = phone_number;
  }
  if (username) {
    qry.push({ username });
    newObj.username = username;
  }

  if (qry?.length) {
    const existUser = await userRepo.findItem({ qry: { $or: qry } });
    if (existUser) {
      throw badRequest(`User Already exist!`);
    }
  }
  newObj.password = await hashing.generateHash(password);

  const user = await userRepo.create(newObj);
  const { id } = user;
  const common = { id, email };
  const payload = {
    ...common,
    name,
  };
  const accessToken = token.generateToken({ payload });

  const refreshToken = token.generateToken({
    payload: common,
    secret: REFRESH_TOKEN_SECRET,
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
  await userRepo.updateItemById({ id, updateDate: { refreshToken } });
  return {
    user,
    accessToken,
    refreshToken,
  };
};

module.exports = register;
