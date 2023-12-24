const { isValidObjectId } = require("mongoose");
const establishmentRepo = require("../../repo/establishment");
const { notFound, badRequest } = require("../../utils/error");

const findSingleItem = async ({ id }) => {
  if (!id || !isValidObjectId(id)) throw badRequest(`Invalid user id!`);
  const item = await establishmentRepo.findItemById({ id });
  if (!item) throw notFound();

  return {
    item,
    links: {
      self: `/users/${item.id}`,
    },
  };
};

module.exports = findSingleItem;
