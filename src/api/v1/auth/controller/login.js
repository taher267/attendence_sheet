const authService = require("../../../../service/auth");
const { setAccessAndRefreshToken } = require("../urils");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { accessToken, refreshToken, user } = await authService.login({
      username,
      password,
    });
    setAccessAndRefreshToken(res, { setRefresh: true, refreshToken });

    res.status(200).json({
      message: "Alhamdu lillah, User login",
      code: 200,
      data: {
        user,
        accessToken,
      },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = login;
