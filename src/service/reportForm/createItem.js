const { badRequest, customError } = require("../../utils/error");
const reportFormRepo = require("../../repo/reportForm");
const keyValueValidation = require("../../utils/keyValueValidation");
const fieldsFilter = require("../../utils/fieldsFilter");

const createItem = async ({ name, fields, status }) => {
  if (!name || !fields?.length) {
    throw badRequest(`Invalid parameters!`);
  }
  const qry = { name: { $regex: name, $options: "i" } };

  // Check on db it exist or not in Db
  const existReportForm = await reportFormRepo.findItem({
    qry,
  });

  if (existReportForm) {
    throw customError({
      message: "Failure to create report form!",
      errors: [{ name: `Form name already exist!` }],
    });
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

  const newObj = {
    name,
    fields,
  };
  if (status) {
    newObj.status = status;
  }
  const reportForm = await reportFormRepo.create(newObj);
  return reportForm;
};

module.exports = createItem;
