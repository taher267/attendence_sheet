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

const updateItemPropertiesByObserver = async ({
  id,
  report_permission_id,
  user_id,
  status,
}) => {
  if (
    !report_permission_id ||
    !isValidObjectId(report_permission_id) ||
    !user_id ||
    !isValidObjectId(user_id) ||
    !id ||
    !isValidObjectId(id) ||
    !fields?.length
  ) {
    throw badRequest(`Invalid parameters!`);
  }

  const existWorkReport = await workReportRepo.findItemById({
    id,
  });

  if (!existWorkReport) {
    throw notFound();
  } else if (
    !workReportConfig.updatableObserverStatuses.includes(existWorkReport.status)
  ) {
    throw badRequest(`Your are not eligible to update!`);
  }

  const doesExistReportPermission = await reportPermissionRepo.findItemById({
    id,
  });

  if (!doesExistReportPermission) {
    throw badRequest(`Report Permission table doesn't exist!`);
  } else if (user_id !== doesExistReportPermission.observer?.toString?.()) {
    throw authorizationError(`Invalid user id!`);
  }

  // if (doesExistReportPermission.status !== "open") {
  //   throw badRequest(`Report Permission table doesn't eligible to update!`);
  // }

  const updateWorkReportObj = { status };

  const updated = await workReportRepo.updateItemById({
    id,
    updateData: updateWorkReportObj,
    options: { new: true, runValidators: true },
  });

  return updated;
};

module.exports = updateItemPropertiesByObserver;
