const userRepo = require("../../user/userRepo");
const creditRepo = require("../../user/credit.repo");
const bcrypt = require("bcrypt");
const { badRequest, authenticationError, customError } = require("../../utils/error");
const verifyJwt = require("../../utils/verityJWT");
const { JWT_REFRESH_SECRET } = process.env;


/**
 *
 * @param { email, password} param0
 * @returns {accessToken, refreshToken, user, credits}
 */

const login = async ({ email, password }) => {
  const existUser = await userRepo.findItem({
    qry: { email },
    select: "+password +refreshToken",
  });
  if (!existUser || !existUser.password) {
    throw badRequest(`Credentails doesn't match!`);
  }
  //   complate db and user password
  const matchPaaword = await bcrypt.compare(password, existUser.password);

  if (!matchPaaword) {
    throw badRequest(`Credentails doesn't match!`);
  }
  //   Check account status
  if (existUser.status === "pending") {
    throw authenticationError(
      `Please verify your account with email confirmation!`
    );
  } else if (existUser.status === "inactive") {
    throw authenticationError(`Please contact with us to active your account!`);
  }

  // Ready accessToken refreshtoken
  let refreshToken = existUser.refreshToken;

  if (
    !refreshToken ||
    !verifyJwt({
      secret: JWT_REFRESH_SECRET,
      token: refreshToken,
    }).success
  ) {
    refreshToken = await existUser.getRefreshToken({ save: true });
  }
  const credits = await creditRepo.findItem({
    qry: { userId: existUser.id },
    select: "trial premium expiry",
  });
  if (!credits) {
    throw customError({ message: `Something going Wrong!`, status: 500 });
  }

  let haveCreditUpdate = false;
  if (credits.trial < 0) {
    credits.trial = 0;
    haveCreditUpdate = true;
  }
  if (credits.premium < 0) {
    credits.premium = 0;
    haveCreditUpdate = true;
  }
  if (haveCreditUpdate) {
    await credits.save();
  }
  const accessToken = existUser.getJWToken();
  const creditsTransformd = { trial: 0, premium: 0 };
  if (existUser.accountType !== "normal") {
    if (credits.premium > 0 && credits.expiry.valueOf() > Date.now()) {
      creditsTransformd.premium = credits?.premium;
    }
  } else if (credits?.trial > 0) {
    creditsTransformd.trial = credits?.trial;
  }
  const { ...rest } = existUser._doc;
  const userObj = { ...rest };
  delete userObj.password;
  delete userObj.refreshToken;
  delete userObj.updatedAt;

  return {
    accessToken,
    refreshToken,
    user: userObj,
    credits: creditsTransformd,
  };
};

module.exports = login;
