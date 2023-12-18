const { badRequest, customError, notFound } = require("../../utils/error");
const departmentRepo = require("../../repo/department");
const keyValueValidation = require("../../utils/keyValueValidation");
const fieldsFilter = require("../../utils/fieldsFilter");
const { isValidObjectId } = require("mongoose");

const updateItem = async ({ id, name, fields, status }) => {
  if ((!name && !fields?.length && !status) || !id || !isValidObjectId(id)) {
    throw badRequest(`Invalid parameters!`);
  }
  const existdepartment = await departmentRepo.findItemById({
    id,
  });

  if (!existdepartment) {
    throw notFound();
  }
  if (name && name !== existdepartment.name) {
    const qry = { name: { $regex: name, $options: "i" } };
    const existdepartmentByName = await departmentRepo.findItemById({
      qry,
    });
    if (existdepartmentByName) {
      throw customError({
        message: "Failure to create report form!",
        errors: [{ name: `Form name already exist!` }],
      });
    }
  }

  const isValidField = keyValueValidation({
    keys: ["label", "name"],
    values: fields,
  });
  if (!isValidField) {
    throw customError({
      message: "Failure to create report form!",
      errors: [{ fields: `Invalid params` }],
    });
  }
  const filtering = fieldsFilter({
    keys: ["label", "name", "type", "validation"],
    values: fields,
  });

  if (!filtering?.length) {
    throw customError({
      message: "Failure to create report form!",
      errors: [{ fields: `Minimum one field is mandatory!` }],
    });
  }

  const updateObj = {
    name,
    fields,
  };
  if (status) {
    updateObj.status = status;
  }
  const department = await departmentRepo.updateItemById({
    id,
    updateDate: updateObj,
    options: { new: true },
  });
  return department;
};

module.exports = updateItem;
