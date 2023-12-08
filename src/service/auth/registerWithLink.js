const userRepo = require("../../repo/user");
const crypto = require("crypto");
const generateHashLink = require("./generateHashLink");
const getRegisterLink = require("./getRegisterLink");
const sendEmail = require("../../utils/sendEmail");
const { accountVarificationTemplate } = require("../template");
const { badRequest, customError } = require("../../utils/error");
const hashing = require("../../utils/hashing");

const registerWithLink = async ({
  name,
  email,
  password,
  username,
  phone_number,
  _id,
  url,
}) => {
  if (!name || !email || !password) {
    throw badRequest(`Invalid parameters!`);
  } else if (!url) {
    throw customError(`Something Went Wrong!`);
  }
  if (_id) {
    const str = `${crypto.randomBytes(20).toString("hex")}.${_id}`;
    const { token: registerToken } = generateHashLink({
      str,
    });
    const payload = { _id, email, hash: str };
    const { sign, exp } = getRegisterLink({ payload }); //exp in seconds

    const hash = await hashing.generateHash(password);
    console.log({ sign });

    await userRepo.updateItem({
      qry: { _id },
      updateDate: { registerToken, password: hash, tokenExpiry: exp * 1000 },
    });
    const link = `${url}/${sign}`;
    const template = accountVarificationTemplate({ username: name, link });
    await sendEmail({
      html: template,
      sendTo: email,
      subject: "Register Varificaton",
    });
    return { code: 200 };
  }
  const qry = [{ email }];
  const newData = {
    status: "pending",
    name,
    email,
  };
  if (username) {
    qry.push({ username });
    newData.username = username;
  }
  if (phone_number) {
    qry.push({ phone_number });
    newData.phone_number = phone_number;
  }

  const existUser = await userRepo.findItem({ qry: { $or: qry } });

  if (existUser) {
    throw badRequest(`User already exist!`);
  }

  newData.password = await hashing.generateHash(password);
  // console.log(newData)
  const newUser = await userRepo.createNewItem({
    data: newData,
  });
  const str = `${crypto.randomBytes(20).toString("hex")}.${newUser.id}`;
  const { token: registerToken } = generateHashLink({
    str,
  });
  const payload = { _id, email, hash: str };
  const { sign, exp } = getRegisterLink({ payload });
  console.log({ sign, password });
  // newUser.registerToken = registerToken;
  // newUser.tokenExpiry = exp * 1000;
  const link = `${url}/${sign}`;
  const template = accountVarificationTemplate({ username: name, link });
  await sendEmail({
    html: template,
    sendTo: email,
    subject: "Register Varificaton",
  });
  return { code: 201 };
};

module.exports = registerWithLink;
