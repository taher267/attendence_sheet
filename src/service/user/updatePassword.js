const userRepo = require("../../repo/user");
const { badRequest, serverError } = require("../../utils/error");
const { hashMatched, generateHash } = require("../../utils/hashing");
const { generateToken } = require("../token");

const { REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY } = process.env;
const updatePassword = async ({
  oldPassword,
  newPassword,
  confirmPassword,
  id,
}) => {
  if (!REFRESH_TOKEN_EXPIRY || !REFRESH_TOKEN_SECRET) {
    throw serverError();
  }
  if (!oldPassword || !newPassword || !id || !confirmPassword) {
    throw badRequest(`Please provide parameters!`);
  }
  if (newPassword !== confirmPassword) {
    throw badRequest(`Password & confirm password does not match`);
  }
  const user = await userRepo.findItemById({
    id,
    select: "password email",
  });
  if (!user.password) {
    throw badRequest(`You can not able to change password`);
  }
  const isPasswordMatched = await hashMatched(oldPassword, user.password);

  if (!isPasswordMatched) {
    throw badRequest(`Old password is incorrect`);
  }

  const password = await generateHash(newPassword);
  const payload = { id, email: user.email };
  const refreshToken = generateToken({
    payload,
    secret: REFRESH_TOKEN_SECRET,
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
  await userRepo.updateItemById({ id, updateDate: { password, refreshToken } });
  return { code: 200, refreshToken };
};

module.exports = updatePassword;
