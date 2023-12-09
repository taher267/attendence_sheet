const { badRequest, customError } = require("../../utils/error");
const establishmentRepo = require("../../repo/establishment");
const bcrypt = require("bcrypt");

const createItem = async ({ name, fields }) => {
  if (!name || !fields?.length) {
    throw badRequest(`Invalid parameters!`);
  }

  const existEstablishment = await establishmentRepo.findItem({
    qry: { name: { $regex: name, $options: "i" } },
  });

  if (existEstablishment) {
    throw customError({
      message: "Failure to create user!",
      errors: [{ name: `User already exist!` }],
    });
  }

  const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));

  const newObj = {
    name,
    email,
    password: hash,
  };
  if (phone_number) {
    newObj.phone_number = phone_number;
  }
  if (username) {
    newObj.username = username;
  }
  if (roles) {
    newObj.roles = roles;
  }

  if (passwordAllow) {
    newObj.passwordAllow = passwordAllow;
  }
  if (password) {
  }

  const user = await establishmentRepo.createNewItem(newObj);
  delete user.password;
  return user;
};

module.exports = createItem;
