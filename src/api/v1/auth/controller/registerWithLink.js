const userService = require("../../../../service/auth");

const resendRegisterLink = async (req, res, next) => {
  try {
    const {
      body: { name, email, password, username, phone_number },
      headers: { origin },
    } = req;
    const url = `${origin}/register-confirmation`;
    
    await userService.registerWithLinkLocalCache({
      name,
      email,
      password,
      username,
      phone_number,
      url,
    });

    res.status(201).json({
      code: 201,
      message: `Register link has been send on your provided email(${email})`,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = resendRegisterLink;
