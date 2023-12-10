const { badRequest } = require("../../utils/error");
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

  const createdItem = await holidayRepo.createNewItem(newObj);
  return createdItem;
};

module.exports = createItem;
