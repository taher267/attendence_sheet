const { notFound, badRequest } = require("../../utils/error");
const departmentRepo = require("../../repo/department");
const { isValidObjectId } = require("mongoose");

const removeItem = async ({ id }) => {
  if (!id || !isValidObjectId(id)) throw badRequest(`Invalid user id!`);
  const user = await departmentRepo.deleteItemById({ id });

  if (!user) {
    throw notFound();
  }
  return user;
};
module.exports = removeItem;
