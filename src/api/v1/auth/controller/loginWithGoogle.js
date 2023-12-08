const authService = require("../../../../service/auth");

const loginWithGoogle = async (req, res, next) => {
  try {
    // const { query } = req;
    const { id_token, access_token } = body;
    const { user, accessToken, refreshToken } =
      await authService.loginWithGoogle.IdToenVerify({
        id_token,
        access_token,
      });

    return res.status(200).json({
      message: `Successfully login with google!`,
      code,
      data: { user, accessToken, refreshToken },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = loginWithGoogle;
