const establishmentService = require("../../../../service/establishment");

const updateItem = async (req, res, next) => {
  const { name, fields, status } = req.body;
  const { id } = req.params;

  try {
    const establishment = await establishmentService.updateItem({
      name,
      fields,
      status,
      id,
    });

    const response = {
      code: 200,
      message: "Report form has been updated, Successfully",
      data: { ...establishment },
      links: {
        self: `/establishments/${establishment.id}`,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateItem;
