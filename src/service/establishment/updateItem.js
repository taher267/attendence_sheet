const { badRequest, customError, notFound } = require("../../utils/error");
const establishmentRepo = require("../../repo/establishment");
const keyValueValidation = require("../../utils/keyValueValidation");
const fieldsFilter = require("../../utils/fieldsFilter");
const { isValidObjectId } = require("mongoose");

const updateItem = async ({ id, name, fields, status }) => {
  if ((!name && !fields?.length && !status) || !id || !isValidObjectId(id)) {
    throw badRequest(`Invalid parameters!`);
  }
  const existestablishment = await establishmentRepo.findItemById({
    id,
  });

  if (!existestablishment) {
    throw notFound();
  }
  if (name && name !== existestablishment.name) {
    const qry = { name: { $regex: name, $options: "i" } };
    const existestablishmentByName = await establishmentRepo.findItemById({
      qry,
    });
    if (existestablishmentByName) {
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
  const establishment = await establishmentRepo.updateItemById({
    id,
    updateData: updateObj,
    options: { new: true },
  });
  return establishment;
};

module.exports = updateItem;
