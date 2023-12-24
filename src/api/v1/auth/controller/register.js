const authService = require("../../../../service/auth");
const { setAccessAndRefreshToken } = require("../urils");

const register = async (req, res, next) => {
  try {
    const { name, email, password, username, phone_number } = req.body;
    const { user, accessToken, refreshToken } = await authService.register({
      name,
      email,
      password,
      username,
      phone_number,
    });
    // setAccessAndRefreshToken(res, { setRefresh: true, refreshToken });
    return res.status(201).json({ data: { user, accessToken, refreshToken } });
  } catch (e) {
    next(e);
  }
};

module.exports = register;
