const { isValidObjectId } = require("mongoose");
const Repo = require("../../repo/reportForm");
const { notFound, badRequest } = require("../../utils/error");

const findSingleItem = async ({ id }) => {
  if (!id || !isValidObjectId(id)) throw badRequest(`Invalid user id!`);
  const item = await Repo.findItemById({ id });
  if (!item) throw notFound();

  return {
    item,
    links: {
      self: `/report-forms/${item.id}`,
    },
  };
};

module.exports = findSingleItem;
