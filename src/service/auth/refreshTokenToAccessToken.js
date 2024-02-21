const userRepo = require("../../repo/user");
const { verityJWT } = require("../../utils");
const {
  authorizationError,
  authenticationError,
} = require("../../utils/error");
const { generateToken } = require("../token");
const { REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY } = process.env;

const getAccessTokenByRefreshToken = async ({ refreshToken }) => {
  if (!refreshToken) {
    throw authenticationError();
  }
  const user = await userRepo.findItem({
    qry: { refreshToken },
    select: "email refreshToken",
  });
  if (!user) {
    throw authorizationError();
  }
  const { success, decoded, message } = verityJWT({
    token: refreshToken,
    secret: REFRESH_TOKEN_SECRET,
  });
  // console.log({ success, decoded, message });

  if (!success) {
    throw authorizationError(message);
  }
  const { exp } = decoded;
  const oneHrInMiliSeconds = 3600000; //
  const addOneHr = exp * 1000;
  const common = { id: user.id, email: user.email };
  const payload = {
    ...common,
    name: user.name,
    role: user.roles,
  };
  const accessToken = generateToken({ payload });
  if (addOneHr < Date.now() + oneHrInMiliSeconds) {
    refreshToken = generateToken({
      payload: common,
      expiresIn: REFRESH_TOKEN_SECRET,
      secret: REFRESH_TOKEN_EXPIRY,
    });
    await userRepo.updateItemById({
      id: user.id,
      updateData: { refreshToken },
    });
  }

  return {
    accessToken,
    refreshToken,
  };
};

module.exports = getAccessTokenByRefreshToken;
// let status = e?.status || e?.statusCode || 500,
//   message = e?.response?.data?.message || e?.message || `Something Went Wrong!`;
// const options = {
//   sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
// };
// res.clearCookie("refreshToken", options);
// res.status(status).json({
//   success: false,
//   message,
// });
// setAccessAndRefreshToken(res, {
//     refreshToken: newRefreshToken,
//     setRefresh: true,
//   });
