const userService = require("../../../../service/user");

const setPassword = async (req, res, next) => {
  try {
    const {
      body: { newPassword, confirmPassword },
      user: { id },
    } = req;
    await userService.setPassword({
      newPassword,
      confirmPassword,
      id,
    });
    res.json({ message: "Alhamdu lillah, Password has been set!", code: 200 });
  } catch (e) {
    next(e);
  }
};

module.exports = setPassword;
