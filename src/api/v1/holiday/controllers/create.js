const holidayService = require("../../../../service/holiday");

const create = async (req, res, next) => {
  const { weekly, monthly, occasional } = req.body;

  try {
    const data = await holidayService.createItem({
      weekly,
      monthly,
      occasional,
    });

    const response = {
      code: 201,
      message: "Report form Created Successfully",
      data,
      links: {
        self: `/holidays/${data.id}`,
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = create;
