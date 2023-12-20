const { badRequest, customError } = require("../../utils/error");
const departmentRepo = require("../../repo/department");
const establishmentRepo = require("../../repo/establishment");
const { isValidObjectId } = require("mongoose");

const createItem = async ({ name, establishment_id }) => {
  if (!name || !establishment_id || !isValidObjectId(establishment_id)) {
    throw badRequest(`Invalid parameters!`);
  }
  const doesExitEstablishment = await establishmentRepo.findItemById({
    id: establishment_id,
  });

  if (!doesExitEstablishment) {
    throw customError({
      message: "Failure to create department!",
      errors: [{ name: `Establishment doesn't exist! 🥵` }],
    });
  }

  const newObj = {
    name,
    establishment_id,
  };
  const item = await departmentRepo.createNewItem({ data: newObj });
  return item;
};

module.exports = createItem;
