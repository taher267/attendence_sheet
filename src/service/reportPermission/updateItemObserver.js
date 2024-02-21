const { badRequest } = require("../../utils/error");
const reportPermissionRepo = require("../../repo/reportPermission");
const { isValidObjectId } = require("mongoose");
const reportFormRepo = require("../../repo/reportForm");
const userRepo = require("../../repo/user");
const establishmentRepo = require("../../repo/establishment");
const departmentRepo = require("../../repo/department");
const holidayRepo = require("../../repo/holiday");

const updateItem = async ({
  id,
  user: { id: user_id },
  report_form_id,
  // establishment_id,
  // department_id,
  holiday_id,
  // observer,
  status,
}) => {
  if (
    !id ||
    !isValidObjectId(id) ||
    !report_form_id ||
    !isValidObjectId(report_form_id) ||
    // (establishment_id && !isValidObjectId(establishment_id)) ||
    // (department_id && !isValidObjectId(department_id)) ||
    (holiday_id && !isValidObjectId(holiday_id))
    // ||(!observer && !isValidObjectId(observer))
  ) {
    throw badRequest(`Invalid parameters!`);
  }

  const doesExist = await reportPermissionRepo.findItemById({ id });
  if (!doesExist) {
    throw badRequest(`Report permission doesn't exist!`);
  }
  const updateData = {};

  if (
    report_form_id &&
    report_form_id !== doesExist?.report_form_id?.toString?.()
  ) {
    if (report_form_id) {
      const doesExist = await reportFormRepo.findItemById({
        id: report_form_id,
      });
      if (!doesExist) {
        throw badRequest(`Report Form doesn't exist the id: ${report_form_id}`);
      } else if (doesExist?.status !== "active") {
        throw badRequest(
          `Report Form should be Active of the id: ${report_form_id}`
        );
      }
      updateData.report_form_id = report_form_id;
    }
  }

  // if (
  //   establishment_id &&
  //   establishment_id !== doesExist?.establishment_id?.toString?.()
  // ) {
  //   if (!(await establishmentRepo.findItemById({ id: establishment_id }))) {
  //     throw badRequest(
  //       `Establishment doesn't exist the id: ${establishment_id}`
  //     );
  //   }
  //   updateData.establishment_id = establishment_id;
  // }
  // if (
  //   department_id &&
  //   department_id !== doesExist?.department_id?.toString?.()
  // ) {
  //   if (!(await departmentRepo.findItemById({ id: department_id }))) {
  //     throw badRequest(`Department doesn't exist the id: ${department_id}`);
  //   }
  //   updateData.department_id = department_id;
  // }

  if (holiday_id && holiday_id !== doesExist?.holiday_id?.toString?.()) {
    if (!(await holidayRepo.findItemById({ id: holiday_id }))) {
      throw badRequest(`Holiday doesn't exist the id: ${holiday_id}`);
    }
    updateData.holiday_id = holiday_id;
  }
  // if (observer && observer !== doesExist?.observer?.toString?.()) {
  //   const doesExist = await userRepo.findItemById({ id: observer });
  //   if (!doesExist) {
  //     throw badRequest(`Observer doesn't exist the id: ${observer}`);
  //   } else if (doesExist?.status !== "active") {
  //     throw badRequest(`Observer should be Active User of the id: ${observer}`);
  //   } else if (!doesExist?.roles?.includes("observer")) {
  //     throw badRequest(`Observer should be Active User of the id: ${observer}`);
  //   }
  //   newObj.observer = observer;
  // }

  if (status && doesExist?.status !== status) {
    updateData.status = status;
  }

  const reportForm = await reportPermissionRepo.updateItemById({
    id,
    updateData: updateObj,
    options: { new: true, runValidators: true },
  });
  return reportForm;
};

module.exports = updateItem;
