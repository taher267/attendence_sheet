const userRepo = require("../../repo/user");
const crypto = require("crypto");
const generateHashLink = require("./generateHashLink");
const getRegisterLink = require("./getSignLink");
const sendEmail = require("../../utils/sendEmail");
const { accountVarificationTemplate } = require("../template");
const { badRequest } = require("../../utils/error");
const cache = require("../../cache");

const registerWithLinkLocalCache = async ({ name, email, url }) => {
  if (!name || !email || !url) {
    throw badRequest(`Invalid parameters!`);
  }

  const existUser = await userRepo.findItem({ qry: { email } });
  if (existUser) {
    throw badRequest(`User already exist!`);
  }

  const str = `${crypto.randomBytes(20).toString("hex")}.${email}`;
  const { token } = generateHashLink({
    str,
  });
  const payload = { email, hash: str };
  const { sign, exp } = getRegisterLink({ payload });
  console.log({ sign });
  // const tokenExpiry = exp * 1000;
  cache.set(email, { token }, exp);

  const link = `${url}/${sign}`;
  const template = accountVarificationTemplate({ username: name, link });
  await sendEmail({
    html: template,
    to: email,
    subject: "Register Varificaton",
  });
  console.log(cache.get(email));
  return { code: 200 };
};

module.exports = registerWithLinkLocalCache;
