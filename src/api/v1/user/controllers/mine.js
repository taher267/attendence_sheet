// const userService = require("../../../../service/user");

const mine = async (req, res, next) => {
  try {
    const { user } = req;
    res
      .status(200)
      .json({ code: 200, message: "Successfully, get user!", data: user })
      .end();
  } catch (e) {
    next(e);
  }
};

module.exports = mine;
