const { notFound, badRequest } = require("../../utils/error");
const userRepo = require("../../repo/user");
const { isValidObjectId } = require("mongoose");

const removeItem = async ({ id }) => {
  if (!id || !isValidObjectId(id)) throw badRequest(`Invalid user id!`);
  const user = await userRepo.deleteItemById({ id });

  if (!user) {
    throw notFound();
  }
  return user;
};
module.exports = removeItem;
