const holidayService = require("../../../../service/holiday");

const findSingleItem = async (req, res, next) => {
  const id = req.params.id;

  try {
    const { data, ...rest } = await holidayService.findSingleItem({
      id,
    });
    const response = {
      data,
      ...rest,
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = findSingleItem;
