const holidayService = require("../../../../service/holiday");

const updateItem = async (req, res, next) => {
  const { weekly, monthly, occasional } = req.body;
  const { id } = req.params;

  try {
    const data = await holidayService.updateItem({
      id,
      weekly,
      monthly,
      occasional,
    });
    const response = {
      code: 200,
      message: "Report form has been updated, Successfully",
      data,
      links: {
        self: `/holidays/${data.id}`,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateItem;
