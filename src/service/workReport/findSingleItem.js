const { isValidObjectId } = require("mongoose");
const workReportRepo = require("../../repo/workReport");
const userRepo = require("../../repo/user");
const reportPermissionRepo = require("../../repo/reportPermission");
const {
  notFound,
  badRequest,
  authorizationError,
} = require("../../utils/error");

const findSingleItem = async ({
  id,
  user: { id: user_id, roles = [] },
  searchfor = "self",
}) => {
  if (!id || !isValidObjectId(id) || !user_id || !isValidObjectId(user_id)) {
    throw badRequest(`Invalid user id!`);
  }
  const qry = { id };
  if (searchfor === "self") {
    qry.user_id = user_id;
  } else if (searchfor === "observe") {
    // qry.user_id = user_id;
    const existInPermissionTable = await reportPermissionRepo.findItem({
      qry: { observer: user_id },
    });
    if (!existInPermissionTable) {
      throw authorizationError();
    }
    qry.report_permission_id = existInPermissionTable.id;
  }
  // if (roles.includes("admin")) {
  // } else if (roles.includes("boserver")) {
  //   const isPermited = await reportPermissionRepo.findItem({
  //     qry: { observer: user_id, id },
  //   });
  // }
  const item = await workReportRepo.findItem({ qry });
  if (!item) throw notFound();

  return {
    user,
    links: {
      self: `/work-reports/${item.id}`,
    },
  };
};

module.exports = findSingleItem;
