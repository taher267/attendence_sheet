const holidayService = require("../../../../service/holiday");

const updateItem = async (req, res, next) => {
  const { name, fields, status } = req.body;
  const { id } = req.params;

  try {
    const data = await holidayService.updateItem({
      name,
      fields,
      status,
      id,
    });

    const response = {
      code: 200,
      message: "Report form has been updated, Successfully",
      data: { ...data },
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
