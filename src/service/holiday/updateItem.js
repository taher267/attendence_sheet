const { badRequest } = require("../../utils/error");
const repo = require("../../repo/holiday");
const { isValidObjectId } = require("mongoose");

const updateItem = async ({ id, weekly, monthly, occasional }) => {
  if (!id || !isValidObjectId(id)) {
    throw badRequest(`Invalid parameters!`);
  }
  // const doesExistItem = await repo.findItemById({
  //   id,
  // });

  // if (!doesExistItem) {
  //   throw notFound();
  // }
  const updateObj = {};

  if (weekly) {
    updateObj.weekly = weekly;
  }
  if (monthly) {
    updateObj.monthly = monthly;
  }
  if (occasional) {
    updateObj.occasional = occasional;
  }

  if (!Object.keys(updateObj).length) {
    throw badRequest(`Nothing to be changed!`);
  }
  const reportForm = await repo.updateItemById({
    id,
    updateData: updateObj,
    options: { new: true, runValidators: true },
  });
  return reportForm;
};

module.exports = updateItem;
