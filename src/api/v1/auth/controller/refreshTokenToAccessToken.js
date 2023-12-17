const config = require("../../../../config");
const authService = require("../../../../service/auth");
const { setAccessAndRefreshToken } = require("../urils");

const getAccessTokenByRefreshToken = async (req, res, next) => {
  try {
    const { cookies } = req;
    const { accessToken, refreshToken } =
      await authService.getAccessTokenByRefreshToken({
        refreshToken: cookies?.refreshToken,
      });
    const response = {
      message: `Successfully generate access token!`,
      code: 200,
      data: { accessToken },
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

module.exports = getAccessTokenByRefreshToken;
