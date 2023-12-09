const { badRequest, customError } = require("../../utils/error");
const reportPermissionRepo = require("../../repo/reportPermission");
const bcrypt = require("bcrypt");

const createItem = async ({
  name,
  email,
  // status,
  phone_number,
  username,
  passwordAllow,
  // lastLogin,
  roles,
  // refreshToken,
  password,
}) => {
  if (!name || !email || !password) {
    throw badRequest(`Invalid parameters!`);
  }

  const qry = [{ email }];
  if (username) {
    qry.push({ username });
  }

  if (phone_number) {
    qry.push({ phone_number });
  }

  const existUser = await reportPermissionRepo.findItem({
    qry: { $or: qry },
  });

  if (existUser) {
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

  const user = await reportPermissionRepo.createNewItem(newObj);
  delete user.password;
  return user;
};

module.exports = createItem;
