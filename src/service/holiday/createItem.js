const { badRequest } = require("../../utils/error");
const holidayRepo = require("../../repo/holiday");
const createItem = async ({
  name,
  weekly = [],
  monthly = [],
  occasional = [],
  individual = [],
}) => {
  if (
    !name ||
    (!weekly?.length &&
      !monthly?.length &&
      !occasional?.length &&
      !individual?.length)
  ) {
    throw badRequest(`Invalid parameters!`);
  }

  const newObj = { name };
  if (weekly?.length) {
    newObj.weekly = weekly;
  }
  if (monthly?.length) {
    newObj.monthly = monthly;
  }
  if (occasional?.length) {
    newObj.occasional = occasional;
  }
  const createdItem = await holidayRepo.createNewItem({ data: newObj });
  return createdItem;
};

module.exports = createItem;
