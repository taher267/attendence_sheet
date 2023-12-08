const authService = require("../../../../service/auth");

const registerWithGoogle = async (req, res, next) => {
  try {
    // const { query } = req;
    const { id_token, access_token } = body;
    const { user, accessToken, refreshToken } =
      await authService.registerWithGoogle.IdToenVerify({
        id_token,
        access_token,
      });

    return res.status(201).json({
      message: `Successfully Register with google!`,
      code: 201,
      data: { user, accessToken, refreshToken },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = registerWithGoogle;
