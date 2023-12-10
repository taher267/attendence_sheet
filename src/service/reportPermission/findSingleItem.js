const { isValidObjectId } = require("mongoose");
const reportPermissionRepo = require("../../repo/reportPermission");
const { notFound, badRequest } = require("../../utils/error");

const findSingleItem = async ({ id }) => {
  if (!id || !isValidObjectId(id)) throw badRequest(`Invalid id!`);
  const data = await reportPermissionRepo.findItemById({ id });
  if (!data) throw notFound();

  return {
    data,
    links: {
      self: `/report-permissions/${data.id}`,
    },
  };
};

module.exports = findSingleItem;
