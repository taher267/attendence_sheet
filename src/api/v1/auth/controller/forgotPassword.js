const userService = require("../../../../service/auth");

const forgotPassword = async (req, res, next) => {
  try {
    const {
      body: { email },
      headers: { origin },
    } = req;
    const url = `${origin}/forget-password`;

    await userService.forgetPassword({ email, url });

    res.json({
      message: "Successfully send email for Recovery account!",
      code: 200,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = forgotPassword;
