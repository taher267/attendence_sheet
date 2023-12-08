const login = require("./login");
const register = require("./register");
const registerWithLink = require("./registerWithLink");
const registerValificationWithLink = require("./registerValificationWithLink");
// const resendRegisterLink = require("./resendRegisterLink");
const forgetPassword = require("./forgotPassword");
const resetPassword = require("./resetPassword");
const getAccessTokenByRefreshToken = require("./refreshTokenToAccessToken");
const loginOrRegisterWithGoogle = require("./loginOrRegisterWithGoogle");
const loginWithGoogle = require("./loginWithGoogle");
const registerWithGoogle = require("./registerWithGoogle");
const logout = require("./logout");

module.exports = {
  login,
  register,
  registerWithLink,
  registerValificationWithLink,
  // resendRegisterLink,
  forgetPassword,
  resetPassword,
  getAccessTokenByRefreshToken,
  loginOrRegisterWithGoogle,
  loginWithGoogle,
  registerWithGoogle,
  logout
};
