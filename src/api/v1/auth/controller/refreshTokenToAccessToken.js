const authService = require("../../../../service/auth");

const getAccessTokenByRefreshToken = async (req, res, next) => {
  try {
    const { cookies } = req;
    const { accessToken, refreshToken } =
      await authService.getAccessTokenByRefreshToken({
        refreshToken: cookies?.refreshToken,
      });
    return res.status(200).json({
      message: `Successfully generate access token!`,
      code: 200,
      data: { accessToken, refreshToken },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = getAccessTokenByRefreshToken;
