const {
  badRequest,
  customError,
  authorizationError,
} = require("../../utils/error");
const workReportRepo = require("../../repo/workReport");
// const userRepo = require("../../repo/user");
const reportPermissionRepo = require("../../repo/reportPermission");
const { isValidObjectId } = require("mongoose");
const workReportConfig = require("../../config/workReport");

const updateItemProperties = async ({ id, status }) => {
  if (!id || !isValidObjectId(id)) {
    throw badRequest(`Invalid parameters!`);
  }

  const existWorkReport = await workReportRepo.findItemById({
    id,
  });

  if (!existWorkReport) {
    throw notFound();
  }

  // else if (
  //   !workReportConfig.updatableObserverStatuses.includes(existWorkReport.status)
  // ) {
  //   throw badRequest(`Your are not eligible to update!`);
  // }

  const updateWorkReportObj = { status };

  const updated = await workReportRepo.updateItemById({
    id,
    updateData: updateWorkReportObj,
    options: { new: true, runValidators: true },
  });

  return updated;
};

module.exports = updateItemProperties;
