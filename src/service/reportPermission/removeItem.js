const { notFound, badRequest } = require("../../utils/error");
const reportPermissionRepo = require("../../repo/reportPermission");
const { isValidObjectId } = require("mongoose");

const removeItem = async ({ id }) => {
  if (!id || !isValidObjectId(id)) throw badRequest(`Invalid id!`);
  const item = await reportPermissionRepo.deleteItemById({ id });

  if (!item) {
    throw notFound();
  }
  return item;
};
module.exports = removeItem;
