const { badRequest } = require("../../utils/error");
const reportPermissionRepo = require("../../repo/reportPermission");
const userRepo = require("../../repo/user");
const reportFormRepo = require("../../repo/reportForm");
const establishmentRepo = require("../../repo/establishment");
const departmentRepo = require("../../repo/department");
const holidayRepo = require("../../repo/holiday");

const { isValidObjectId } = require("mongoose");
/**
TODO: open_submission_date check can not before today
 */
const createItem = async ({
  user_id,
  report_form_id,
  status,
  establishment_id,
  department_id,
  holiday_id,
  observer,
  open_submission_date,
}) => {
  if (
    !user_id ||
    !isValidObjectId(user_id) ||
    !report_form_id ||
    !isValidObjectId(report_form_id) ||
    (establishment_id && !isValidObjectId(establishment_id)) ||
    (department_id && !isValidObjectId(department_id)) ||
    (holiday_id && !isValidObjectId(holiday_id)) ||
    !open_submission_date
    //|| !observer ||
    // !isValidObjectId(observer)
  ) {
    throw badRequest(`Invalid parameters!`);
  }

  const newObj = { open_submission_date };
  if (user_id) {
    const doesExist = await userRepo.findItemById({ id: user_id });
    if (!doesExist) {
      throw badRequest(`User doesn't exist the id: ${user_id}`);
    } else if (doesExist?.status !== "active") {
      throw badRequest(`User should be Active of the id: ${user_id}`);
    }
    newObj.user_id = user_id;
  }
  if (report_form_id) {
    const doesExist = await reportFormRepo.findItemById({ id: report_form_id });
    if (!doesExist) {
      throw badRequest(`Report Form doesn't exist the id: ${report_form_id}`);
    } else if (doesExist?.status !== "active") {
      throw badRequest(
        `Report Form should be Active of the id: ${report_form_id}`
      );
    }
    newObj.report_form_id = report_form_id;
  }

  if (establishment_id) {
    if (!(await establishmentRepo.findItemById({ id: establishment_id }))) {
      throw badRequest(
        `Establishment doesn't exist the id: ${establishment_id}`
      );
    }

    newObj.establishment_id = establishment_id;
  }
  if (department_id) {
    if (!(await departmentRepo.findItemById({ id: department_id }))) {
      throw badRequest(`Department doesn't exist the id: ${department_id}`);
    }
    newObj.department_id = department_id;
  }
  if (holiday_id) {
    if (!(await holidayRepo.findItemById({ id: holiday_id }))) {
      throw badRequest(`Holiday doesn't exist the id: ${holiday_id}`);
    }
    newObj.holiday_id = holiday_id;
  }
  if (observer) {
    const doesExist = await userRepo.findItemById({ id: observer });
    if (!doesExist) {
      throw badRequest(`Observer doesn't exist the id: ${observer}`);
    } else if (doesExist?.status !== "active") {
      throw badRequest(`Observer should be Active User of the id: ${observer}`);
    } else if (!doesExist?.roles?.includes("observer")) {
      throw badRequest(`Observer should be Active User of the id: ${observer}`);
    }
    newObj.observer = observer;
  }
  if (status) {
    newObj.status = status;
  }
  const created = await reportPermissionRepo.createNewItem({ data: newObj });
  return created;
};

module.exports = createItem;
