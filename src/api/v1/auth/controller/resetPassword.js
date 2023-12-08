const userService = require("../../../../service/auth");

const resetPassword = async (req, res, next) => {
  try {
    const { hashToken, newPassword, confirmPassword } = req.body;
    await userService.resetPassword({
      hashToken,
      newPassword,
      confirmPassword,
    });
    res.json({
      message: "Alhamdu lillah, Password has been reset!",
      code: 200,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = resetPassword;
