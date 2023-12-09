const { isValidObjectId } = require("mongoose");
const holidayRepo = require("../../repo/holiday");
const { notFound, badRequest } = require("../../utils/error");

const findSingleItem = async ({ id }) => {
  if (!id || !isValidObjectId(id)) throw badRequest(`Invalid parameters!`);
  const data = await holidayRepo.findItemById({ id });
  if (!data) throw notFound();

  return {
    data,
    links: {
      self: `/holidays/${data.id}`,
    },
  };
};

module.exports = findSingleItem;
