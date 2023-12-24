const userService = require("../../../../service/auth");

const updatePassword = async (req, res, next) => {
  try {
    const {
      body: { oldPassword, newPassword, confirmPassword },
      user: { id },
    } = req;
    const { refreshToken } = await userService.updatePassword({
      oldPassword,
      newPassword,
      confirmPassword,
      id,
    });

    res.json({
      message: "Alhamdu lillah, password has been updated!",
      data: { refreshToken },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = updatePassword;
