const userService = require("../../../../service/auth");
const {
  badRequest,
  customError,
  notFound,
} = require("../../../../utils/error");

const loginReturnWithCreditUser = async (req, res) => {
  try {
    res.json({ message: "Alhamdu lillah" });
  } catch (e) {
    const status = e.status || 500;
    const message = e.message;

    res.status(status).json({ success: false, code: status, message });
  }
};

module.exports = loginReturnWithCreditUser;