const { badRequest, customError } = require("../../utils/error");
const workReportRepo = require("../../repo/workReport");
const reportFormRepo = require("../../repo/reportForm");
const holidayRepo = require("../../repo/holiday");
// const userRepo = require("../../repo/user");
const reportPermissionRepo = require("../../repo/reportPermission");
const { isValidObjectId } = require("mongoose");
const moment = require("moment");
const workReportConfig = require("../../config/workReport");
const helpers = require("./helpers");
// const dbDate = "2023-12-09T14:11:53.599+00:00";
// const submitDate = "2023-12-08T14:11:53.599+00:00";
// userRepo
//   .findItem({ qry: { email: "abutaher267@gmail.com" }, select: "createdAt" })
//   .then((d) => {
//     console.log(d.createdAt.toISOString().slice(0,10));
//   });
// console.log(moment('2023-12-28').day())
const createItem = async ({
  report_permission_id,
  fields = [],
  for_submission_date,
  status = "submited",
  user_id,
}) => {
  if (
    !report_permission_id ||
    !isValidObjectId(report_permission_id) ||
    !user_id ||
    !isValidObjectId(user_id) ||
    !fields?.length ||
    !for_submission_date ||
    !moment(for_submission_date).isValid() ||
    moment(for_submission_date)
      .utc()
      .isAfter(moment().utc().endOf("day"), "day")
  ) {
    throw badRequest(`Invalid parameters!`);
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
    throw badRequest(`Report Permission table doesn't eligible to submit!`);
  } else if (workReportConfig.nextSubmitionWithApproval) {
    // totalSubmit: Number,
    // totalReview: Number,
    // totalApproved: Number,
    // totalRejected: Number,
    // currentRejected: Number,
    // doesExistReportPermission
    const remainingApproval =
      doesExistReportPermission.totalSubmit ??
      0 - doesExistReportPermission.totalApproved ??
      0;
    if (remainingApproval) {
      throw badRequest(`Previous all submited from sould be approved first!`);
    }
  } else if (
    !workReportConfig.nextSubmitionWithReject &&
    doesExistReportPermission.currentRejected
  ) {
    if (remainingApproval) {
      throw badRequest(`Please at first approve your all rejected sheet!`);
    }
  } else if (
    workReportConfig.currentSubmitionWithPreviousAllSubmissions &&
    !moment().utc().isSame(moment(for_submission_date).utc(), "day")
  ) {
    // const startDate = moment(doesExistReportPermission.open_submission_date)
    //   .utc()
    //   .startOf("day");
    // const endDate = moment(for_submission_date).utc().startOf("day");

    // const absent_in_day = endDate.diff(startDate, "days");
    throw badRequest(`Fillup your previus absences!`);
  } else if (
    moment(for_submission_date)
      .utc()
      .startOf("day")
      .isBefore(
        moment(doesExistReportPermission.open_submission_date)
          .utc()
          .endOf("day")
      )
  ) {
    throw badRequest(
      `Submission date(${for_submission_date}) can't be before Permission date(${doesExistReportPermission.open_submission_date})!`
    );
  }

  const workReportForm = fields.reduce((a, c) => {
    const [key, value] = Object.entries(c)?.[0];
    a[key] = value;
    return a;
  }, {});
  const { errors, valid } = helpers.submitedFormValidation({
    workReportForm,
    submittedNameValues: reports,
  });
  if (!valid) {
    throw customError({
      message: `Invalid parameters!`,
      errors,
    });
  }
  const inc = {};

  const newObj = { report_permission_id, fields, status, user_id };
  if (workReportConfig.approvalType === "by_form_fill_up") {
    newObj.status = "approved";
    inc.totalApproved = 1;
  }
  //   totalSubmit
  // totalReview
  // totalApproved
  // totalRejected
  // currentRejected

  const created = await workReportRepo.createNewItem(newObj);
  let next_submission_date = moment()
    .utc()
    .startOf("date")
    .add(12, "hours")
    .toISOString();
  if (doesExistReportPermission.holiday_id) {
    const { weekly, occasional } = await holidayRepo.findItemById({
      id: doesExistReportPermission.holiday_id,
    });
    if (weekly?.length) {
      next_submission_date = helpers.holiday_in_week({ holiday: weekly });
    }
    if (occasional?.length) {
      next_submission_date = helpers.holiday_in_occasional({
        holiday: occasional,
      });
    }
  }
  const update_permission = {
    $inc: { ...inc, totalSubmit: 1 },
    open_submission_date: next_submission_date,
  };
  await reportPermissionRepo.updateItemById({
    id: doesExistReportPermission.id,
    updateDate: update_permission,
    options: { new: true, runValidators: true },
  });
  return created;
};

module.exports = createItem;
