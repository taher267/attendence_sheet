const { isValidObjectId } = require("mongoose");
const workReportRepo = require("../../repo/workReport");
// const userRepo = require("../../repo/user");
const Repo = require("../../repo/workReport");
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
  } else if (searchfor === "observer") {
    // qry.user_id = user_id;
    const existInPermissionTable = await Repo.findItem({
      qry: { observer: user_id },
    });
    if (!existInPermissionTable) {
      throw authorizationError();
    }
    qry.report_permission_id = existInPermissionTable.id;
  } else if (!roles.includes("admin")) {
    throw authorizationError();
  }
  // if (roles.includes("admin")) {
  // } else if (roles.includes("boserver")) {
  //   const isPermited = await Repo.findItem({
  //     qry: { observer: user_id, id },
  //   });
  // }
  const item = await workReportRepo.findItem({ qry });
  if (!item) throw notFound();

  return {
    item,
    links: {
      self: `/work-reports/${item.id}`,
    },
  };
};

module.exports = findSingleItem;
