const { isValidObjectId } = require("mongoose");
const holidayRepo = require("../../repo/holiday");
const { notFound, badRequest } = require("../../utils/error");

const findSingleItem = async ({ id }) => {
  if (!id || !isValidObjectId(id)) throw badRequest(`Invalid parameters!`);
  const item = await holidayRepo.findItemById({ id });
  if (!item) throw notFound();

  return {
    item,
    links: {
      self: `/holidays/${item.id}`,
    },
  };
};

module.exports = findSingleItem;
