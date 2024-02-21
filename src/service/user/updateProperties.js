const userConfig = require("../../config/user");
const userRepo = require("../../repo/user");
const { notFound, badRequest } = require("../../utils/error");

const updateProperties = async ({ id, status, roles }) => {
  const updateData = {};
  if (status) {
    if (!userConfig.statuses.includes(status)) {
      throw badRequest(`${status} not allow on status`);
    }
    updateData.status = status;
  }
  if (roles) {
    if (roles?.length) {
      let issue = false;
      for (const role of roles) {
        if (!userConfig.roles.includes(role)) {
          issue = true;
          break;
        }
      }
      if (issue) {
        throw badRequest(`Invalid roles`);
      }
    }
    updateData.roles = roles;
  }
  const updated = await userRepo.updateItemById({
    id,
    updateData,
    options: { new: true },
  });
  if (!updated) {
    throw notFound();
  }
  const copy = { ...updated };
  // delete copy.password;
  return { ...copy };
};

module.exports = updateProperties;
