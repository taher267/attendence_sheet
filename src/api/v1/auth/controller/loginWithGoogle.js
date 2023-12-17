const config = require("../../../../config");
const authService = require("../../../../service/auth");
const { setAccessAndRefreshToken } = require("../urils");

const loginWithGoogle = async (req, res, next) => {
  try {
    // const { query } = req;
    const { id_token, access_token } = req.body;
    const { user, accessToken, refreshToken } =
      await authService.loginWithGoogle.IdToenVerify({
        id_token,
        access_token,
      });
    const response = {
      message: `Successfully login with google!`,
      code: 200,
      data: { user, accessToken },
    };
    if (config.REFRESH_TOKEN_ON === "header") {
      setAccessAndRefreshToken(res, { setRefresh: true, refreshToken });
    } else if (config.REFRESH_TOKEN_ON === "body") {
      response.data.refreshToken = refreshToken;
    }
    return res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = loginWithGoogle;
