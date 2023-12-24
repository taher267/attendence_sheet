const holidayService = require("../../../../service/holiday");

const findSingleItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { item, ...rest } = await holidayService.findSingleItem({
      id,
    });
    const response = {
      data: item,
      ...rest,
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = findSingleItem;
