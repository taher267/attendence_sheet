const holidayService = require("../../../../service/holiday");

const removeItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    await holidayService.removeItem({ id });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = removeItem;
