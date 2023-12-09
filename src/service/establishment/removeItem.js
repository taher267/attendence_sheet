const { notFound, badRequest } = require("../../utils/error");
const establishmentRepo = require("../../repo/establishment");
const { isValidObjectId } = require("mongoose");

const removeItem = async ({ id }) => {
  if (!id || !isValidObjectId(id)) throw badRequest(`Invalid user id!`);
  const user = await establishmentRepo.deleteItemById({ id });

  if (!user) {
    throw notFound();
  }
  return user;
};
module.exports = removeItem;
