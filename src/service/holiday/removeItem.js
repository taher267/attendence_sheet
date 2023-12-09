const { notFound, badRequest } = require("../../utils/error");
const holidayRepo = require("../../repo/holiday");
const { isValidObjectId } = require("mongoose");

const removeItem = async ({ id }) => {
  if (!id || !isValidObjectId(id)) throw badRequest(`Invalid user id!`);
  const user = await holidayRepo.deleteItemById({ id });

  if (!user) {
    throw notFound();
  }
  return user;
};
module.exports = removeItem;
