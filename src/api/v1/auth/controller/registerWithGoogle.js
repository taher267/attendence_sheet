const config = require("../../../../config");
const authService = require("../../../../service/auth");
const { setAccessAndRefreshToken } = require("../urils");

const registerWithGoogle = async (req, res, next) => {
  try {
    // const { query } = req;
    const { id_token, access_token } = req.body;
    const { user, accessToken, refreshToken } =
      await authService.registerWithGoogle.IdToenVerify({
        id_token,
        access_token,
      });
    const response = {
      message: `Successfully Register with google!`,
      code: 201,
      data: { user, accessToken, refreshToken },
    };
    if (config.REFRESH_TOKEN_ON === "header") {
      setAccessAndRefreshToken(res, { setRefresh: true, refreshToken });
    } else if (config.REFRESH_TOKEN_ON === "body") {
      response.data.refreshToken = refreshToken;
    }
    return res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = registerWithGoogle;
