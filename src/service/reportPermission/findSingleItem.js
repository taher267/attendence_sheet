const { isValidObjectId } = require("mongoose");
const reportPermissionRepo = require("../../repo/reportPermission");
const { notFound, badRequest } = require("../../utils/error");

const findSingleItem = async ({ id }) => {
  if (!id || !isValidObjectId(id)) throw badRequest(`Invalid id!`);
  const item = await reportPermissionRepo.findItemById({ id });
  if (!item) throw notFound();

  return {
    item,
    links: {
      self: `/report-permissions/${item.id}`,
    },
  };
};

module.exports = findSingleItem;
