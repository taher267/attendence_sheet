const { badRequest, customError } = require("../../utils/error");
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
    // console.log()
    throw badRequest(`Invalid parameters!`);
  }

  const newObj = { name };

  const doesExist = await holidayRepo.findItem({
    qry: { name: new RegExp(name, "i") },
  });
  if (doesExist) {
    throw customError({
      message: `Failure to create holiday`,
      errors: [{ name: `Name already exist!` }],
    });
  }
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
