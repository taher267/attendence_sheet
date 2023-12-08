const userRepo = require("../../repo/user");
const { badRequest } = require("../../utils/error");
const { generateHash } = require("../../utils/hashing");

const setPassword = async ({ newPassword, confirmPassword, id }) => {
  if (!newPassword || !id || !confirmPassword) {
    throw badRequest(`Please provide parameters!`);
  }
  if (newPassword !== confirmPassword) {
    throw badRequest(`Password & confirm password does not match`);
  }
  const user = await userRepo.findItemById({
    id,
    select: "+password",
  });
  if (user?.password) {
    throw badRequest(`You can not able to set password!`);
  }

  const password = await generateHash(newPassword);
  await userRepo.updateItemById({ id, updateDate: { password } });
  return { code: 200 };
};

module.exports = setPassword;
