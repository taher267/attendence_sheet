const config = require("../../../../config");
const authService = require("../../../../service/auth");
const { setAccessAndRefreshToken } = require("../urils");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { accessToken, refreshToken, user } = await authService.login({
      username,
      password,
    });
    const response = {
      message: "Alhamdu lillah, User login",
      code: 200,
      data: {
        user,
        accessToken,
      },
    };
    if (config.REFRESH_TOKEN_ON === "header") {
      setAccessAndRefreshToken(res, { setRefresh: true, refreshToken });
    } else if (config.REFRESH_TOKEN_ON === "body") {
      response.data.refreshToken = refreshToken;
    }

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = login;
