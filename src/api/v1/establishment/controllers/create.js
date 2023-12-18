const establishmentService = require("../../../../service/establishment");

const create = async (req, res, next) => {
  const { name } = req.body;

  try {
    const establishment = await establishmentService.createItem({
      name,
    });

    const response = {
      code: 201,
      message: "establishments Created Successfully",
      data: { ...establishment },
      links: {
        self: `/establishments/${establishment.id}`,
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = create;
