const { badRequest, customError } = require("../../utils/error");
const workReportRepo = require("../../repo/workReport");
const reportFormRepo = require("../../repo/reportForm");
// const userRepo = require("../../repo/user");
const reportPermissionRepo = require("../../repo/reportPermission");
const { isValidObjectId } = require("mongoose");
const workReportConfig = require("../../config/workReport");

const updateItem = async ({
  report_permission_id,
  fields = [],
  user_id,
  id,
}) => {
  if (
    !report_permission_id ||
    !isValidObjectId(report_permission_id) ||
    !user_id ||
    !isValidObjectId(user_id) ||
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
    !workReportConfig.updatableSelfStatuses.includes(existWorkReport.status)
  ) {
    throw badRequest(`Your are not eligible to update!`);
  }

  const doesExistReportPermission = await reportPermissionRepo.findItemById({
    id,
  });

  if (!doesExistReportPermission) {
    throw badRequest(`Report Permission table doesn't exist!`);
  } else if (user_id !== doesExistReportPermission.user_id?.toString?.()) {
    throw badRequest(`Invalid user id!`);
  }

  const reportForm = await reportFormRepo.findItemById({
    id: doesExistReportPermission.report_form_id,
    select: "fields status",
  });
  if (!reportForm) {
    throw badRequest(`Submission form doesn't exist!`);
  } else if (reportForm.status !== "active") {
    throw badRequest(`Submission form Inactive!`);
  }

  if (doesExistReportPermission.status !== "open") {
    throw badRequest(`Report Permission table doesn't eligible to update!`);
  }

  const workReportForm = fields.reduce((a, c) => {
    const [key, value] = Object.entries(c)?.[0];
    a[key] = value;
    return a;
  }, {});

  const { errors, valid } = submitedFormValidation({
    workReportForm,
    submittedNameValues: reports,
  });
  if (!valid) {
    throw customError({
      message: `Invalid parameters!`,
      errors,
    });
  }

  const updateWorkReportObj = { fields };

  const updated = await workReportRepo.updateItemById({
    id,
    updateDate: updateWorkReportObj,
    options: { new: true, runValidators: true },
  });

  return updated;
};

module.exports = updateItem;
