const cache = require("../../cache");
const userRepo = require("../../repo/user");
const { sendEmail } = require("../../utils");
const { badRequest, serverError } = require("../../utils/error");
const { generateHash } = require("../../utils/hashing");
const verifyJwt = require("../../utils/verityJWT");
const token = require("../token");
const strToCryptoHash = require("./strToCryptoHash");

const {
  REGISTER_LINK_SECRET,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  SMTP_MAIL,
} = process.env;
// const email = "email@gmail.com";

// let count = 0;
// const interval = () =>
//   setInterval(() => {
//     if (count === 5) {
//       cache.del(email);
//     }
//     count++;

//     console.log(cache.get(email));
//   }, 2000);

// setTimeout(() => {
//   cache.set(email, email, 900);
//   interval();
// }, 3000);

/**
 *
 * @param {hashToken} param0
 * hashToken veriry by jwt
 * if pass, form decoded hash search in db after update crypto string
 * if get user check status active give success message and update register token and expiry
 * if get user as inactive message `contact with support` and update register token and expiry
 * if get use's tokenExpiry is valid || Date.now()>tokenExpiry throw error and update register token and expiry
 * if pass, create credit
 * @returns {accessToken, refreshToken, user, credits}
 */
const registerValificationWithLink = async ({
  name,
  hashToken,
  email,
  password,
  username,
  phone_number,
}) => {
  if (!hashToken) {
    throw badRequest(`Please provide validation token!`);
  }
  if (!REGISTER_LINK_SECRET || !REFRESH_TOKEN_SECRET || !REFRESH_TOKEN_EXPIRY) {
    await sendEmail({
      to: SMTP_MAIL,
      subject: "Server Error",
      html: `there is no env data`,
    });
    throw serverError(`Something Going Wrong!`);
  }
  if (!name || !email || !password) {
    throw badRequest(`Invalid parameters!`);
  }
  const verify = verifyJwt({ secret: REGISTER_LINK_SECRET, token: hashToken });

  if (!verify.success) {
    throw badRequest(verify.message);
  }
  const { decoded } = verify;
  const cryptoHash = strToCryptoHash({ str: decoded.hash });
  const tokenCache = cache.get(decoded.email);
  if (
    !tokenCache?.token ||
    tokenCache?.token !== cryptoHash ||
    decoded.email != email
  ) {
    throw badRequest(
      "Account varification token is invalid or has been expired!!"
    );
  }

  const newUser = {
    name,
    email,
    password: await generateHash(password),
  };
  if (phone_number) {
    newUser.phone_number = phone_number;
  }
  if (username) {
    newUser.username = username;
  }

  const user = await userRepo.create(newUser);
  const { id } = user;
  const common = { id, email };
  const payload = {
    ...common,
    name,
  };
  const accessToken = token.generateToken({ payload });

  const refreshToken = token.generateToken({
    payload: common,
    secret: REFRESH_TOKEN_SECRET,
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
  await userRepo.updateItemById({ id, updateDate: { refreshToken } });
  cache.del(email);
  // console.log(cache.get(email), cache.get(decoded.email));
  return {
    user,
    accessToken,
    refreshToken,
  };
};
module.exports = registerValificationWithLink;
