const { notFound, badRequest } = require("../../utils/error");
const holidayRepo = require("../../repo/holiday");
const { isValidObjectId } = require("mongoose");

const removeItem = async ({ id }) => {
  if (!id || !isValidObjectId(id)) throw badRequest(`Invalid user id!`);
  const item = await holidayRepo.deleteItemById({ id });

  if (!item) {
    throw notFound();
  }
  return item;
};
module.exports = removeItem;
