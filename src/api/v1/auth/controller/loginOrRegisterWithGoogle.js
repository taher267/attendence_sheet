const authService = require("../../../../service/auth");

const loginOrRegisterWithGoogle = async (req, res, next) => {
  try {
    // const { query } = req;
    const { id_token, access_token } = body;
    const { user, accessToken, refreshToken, code } =
      await authService.loginOrRegisterWithGoogle.IdToenVerify({
        id_token,
        access_token,
      });

    const message =
      code === 200
        ? `Successfully login with google!`
        : `Successfully Register with google!`;
    return res.status(code).json({
      message,
      code,
      data: { user, accessToken, refreshToken },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = loginOrRegisterWithGoogle;
