const { badRequest, customError } = require("../../utils/error");
const establishmentRepo = require("../../repo/establishment");
const bcrypt = require("bcrypt");

const createItem = async ({ name }) => {
  if (!name) {
    throw badRequest(`Invalid parameters!`);
  }

  const existEstablishment = await establishmentRepo.findItem({
    qry: { name: { $regex: name, $options: "i" } },
  });

  if (existEstablishment) {
    throw customError({
      message: "Failure to create establishment!",
      errors: [{ name: `Name already exist!` }],
    });
  }

  const item = await establishmentRepo.createNewItem({ data: { name } });
  return item;
};

module.exports = createItem;
