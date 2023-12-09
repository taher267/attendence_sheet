const { notFound, badRequest } = require("../../utils/error");
const reportFormRepo = require("../../repo/reportForm");
const { isValidObjectId } = require("mongoose");

const removeItem = async ({ id }) => {
  if (!id || !isValidObjectId(id)) throw badRequest(`Invalid user id!`);
  const user = await reportFormRepo.deleteItemById({ id });

  if (!user) {
    throw notFound();
  }
  return user;
};
module.exports = removeItem;
