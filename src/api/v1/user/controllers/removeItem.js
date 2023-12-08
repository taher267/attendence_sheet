const userService = require("../../../../service/user");

const removeItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    await userService.removeItem({ id });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = removeItem;
