const { isValidObjectId } = require("mongoose");
const reportPermissionRepo = require("../../repo/reportPermission");
const { notFound, badRequest } = require("../../utils/error");

const findSingleItem = async ({ id }) => {
  if (!id || !isValidObjectId(id)) throw badRequest(`Invalid id!`);
  const item = await reportPermissionRepo.findItemById({
    id,
    populate: [["report_form_id"]],
  });
  if (!item) throw notFound();
  item.report_form = item.report_form_id;
  delete item.report_form_id;

  return {
    item,
    links: {
      self: `/report-permissions/${item.id}`,
    },
  };
};

module.exports = findSingleItem;
