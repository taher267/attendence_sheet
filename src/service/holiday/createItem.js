const { badRequest, customError } = require("../../utils/error");
const holidayRepo = require("../../repo/holiday");
const createItem = async ({ weekly = [], monthly = [], occasional = [] }) => {
  if (!weekly?.length && !monthly?.length && !occasional?.length) {
    throw badRequest(`Invalid parameters!`);
  }

  const newObj = {};
  if (weekly?.length) {
    newObj.weekly = weekly;
  }
  if (monthly?.length) {
    newObj.monthly = monthly;
  }
  if (occasional?.length) {
    newObj.occasional = occasional;
  }

  const createItem = await holidayRepo.createNewItem(newObj);
  return createItem;
};

module.exports = createItem;
