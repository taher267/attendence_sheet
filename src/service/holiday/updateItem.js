const { badRequest } = require("../../utils/error");
const holidayRepo = require("../../repo/holiday");
const { isValidObjectId } = require("mongoose");

const updateItem = async ({ id, weekly, monthly, occasional }) => {
  if (!id || !isValidObjectId(id)) {
    throw badRequest(`Invalid parameters!`);
  }
  // const doesExistItem = await holidayRepo.findItemById({
  //   id,
  // });

  // if (!doesExistItem) {
  //   throw notFound();
  // }
  const updateDate = {};

  if (weekly) {
    updateDate.weekly = weekly;
  }
  if (monthly) {
    updateDate.monthly = monthly;
  }
  if (occasional) {
    updateDate.occasional = occasional;
  }

  if (!Object.keys(updateDate).length) {
    throw badRequest(`Nothing to be changed!`);
  }
  const reportForm = await holidayRepo.updateItemById({
    id,
    updateDate: updateObj,
    options: { new: true, runValidators: true },
  });
  return reportForm;
};

module.exports = updateItem;
