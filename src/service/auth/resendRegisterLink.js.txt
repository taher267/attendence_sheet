const userRepo = require("../../repo/user");
const crypto = require("crypto");
const generateHashLink = require("./generateHashLink");
const getRegisterLink = require("./getRegisterLink");
const sendEmail = require("../../utils/sendEmail");
const { badRequest, notFound } = require("../../utils/error");
// const { accountVarificationTemplate } = require("../template");

const resendRegisterLink = async ({ email, url }) => {
  if (!email) {
    throw badRequest(`Please provide email address!`);
  } else if (!url) {
    throw customError(`Something Went Wrong!`);
  }
  const existUser = await userRepo.findItem({
    qry: {
      email,
    },
  });

  if (!existUser) {
    throw notFound(`Invalid credentails!`);
  } else if (existUser.status !== "pending") {
    throw notFound(`Active account or invalid credentails!`);
  }

  const str = `${crypto.randomBytes(20).toString("hex")}.${existUser.id}`;
  const { token: registerToken } = generateHashLink({
    str,
  });
  const payload = { _id: existUser.id, email, hash: str };
  const { sign, exp } = getRegisterLink({ payload });
  console.log({ sign });
  existUser.registerToken = registerToken;
  existUser.tokenExpiry = exp * 1000;
  await existUser.save();
  const link = `${url}/${sign}`;
  console.log(link, "link");
  const template = accountVarificationTemplate({
    username: existUser.name,
    link,
  });
  await sendEmail({
    html: template,
    sendTo: email,
    subject: "Register Varificaton",
  });
  return { code: 200 };
};

module.exports = resendRegisterLink;
