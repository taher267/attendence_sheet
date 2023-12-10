const { badRequest, customError } = require("../../utils/error");
const workReportRepo = require("../../repo/workReport");
const reportPermissionRepo = require("../../repo/reportPermission");
const { isValidObjectId } = require("mongoose");
const moment = require("moment");
const workReportConfig = require("../../config/workReport");

const createItem = async ({
  report_permission_id,
  fields,
  for_submission_date,
}) => {
  if (
    !report_permission_id ||
    !isValidObjectId(report_permission_id) ||
    !fields?.length ||
    !for_submission_date ||
    !moment(for_submission_date).isValid()
  ) {
    throw badRequest(`Invalid parameters!`);
  }
  const doesExistReportPermission = await reportPermissionRepo.findItemById({
    id,
  });
  if (!doesExistReportPermission) {
    throw badRequest(`Report Permission table doesn't exist!`);
  } else if (doesExistReportPermission.status !== "open") {
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
  } else if (workReportConfig.nextSubmitionWithApproval) {

    const remainingApproval =
      doesExistReportPermission.totalSubmit ??
      0 - doesExistReportPermission.totalApproved ??
      0;
    if (remainingApproval) {
      throw badRequest(`Previous all submited from sould be approved first!`);
    }
  }

  const qry = [{ email }];
  if (username) {
    qry.push({ username });
  }

  if (phone_number) {
    qry.push({ phone_number });
  }

  const existUser = await workReportRepo.findItem({
    qry: { $or: qry },
  });

  if (existUser) {
    throw customError({
      message: "Failure to create user!",
      errors: [{ name: `User already exist!` }],
    });
  }

  const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));

  const newObj = {
    name,
    email,
    password: hash,
  };
  if (phone_number) {
    newObj.phone_number = phone_number;
  }
  if (username) {
    newObj.username = username;
  }
  if (roles) {
    newObj.roles = roles;
  }

  if (passwordAllow) {
    newObj.passwordAllow = passwordAllow;
  }
  if (password) {
  }

  const user = await workReportRepo.createNewItem(newObj);
  delete user.password;
  return user;
};

module.exports = createItem;
