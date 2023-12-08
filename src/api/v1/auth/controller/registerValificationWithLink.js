const userService = require("../../../../service/auth");
const { setAccessAndRefreshToken } = require("../urils");

const registerValificationWithLink = async (req, res, next) => {
  try {
    const { name, hashToken, email, password, username, phone_number } =
      req.body;
    const { user, accessToken, refreshToken } =
      await userService.registerValificationWithLink({
        name,
        hashToken,
        email,
        password,
        username,
        phone_number,
      });
    // setAccessAndRefreshToken(res, { setRefresh: true, refreshToken });
    return res.status(201).json({
      code: 201,
      message: `Alhamdu lillah, Account has been varified successfully!`,
      data: {
        user,
        accessToken,
        refreshToken,
      },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = registerValificationWithLink;
