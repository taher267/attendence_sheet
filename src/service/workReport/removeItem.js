const {
  notFound,
  badRequest,
  authorizationError,
} = require("../../utils/error");
const workReportRepo = require("../../repo/workReport");
const { isValidObjectId } = require("mongoose");
const { deleteRolesAllow } = require("../../config/workReport");
const matchRole = require("../../utils/matchRole");

const removeItem = async ({ id, user: { id: user_id, roles } }) => {
  if (!id || !isValidObjectId(id) || !user_id || !isValidObjectId(user_id)) {
    throw badRequest(`Invalid user id!`);
  }

  const { match, role } = matchRole({ roles, allowRoles: deleteRolesAllow });
  const qry = { id };
  if (!match) {
    throw authorizationError();
  } else if (role === "user") {
    qry.user_id = user_id;
  }
  const removed = await workReportRepo.deleteItem({ qry });

  if (!removed) {
    throw notFound();
  }
  return removed;
};
module.exports = removeItem;
