const establishmentService = require("../../../../service/establishment");

const findSingleItem = async (req, res, next) => {
  const id = req.params.id;

  try {
    const { user, ...rest } = await establishmentService.findSingleItem({
      id,
    });
    const response = {
      data: user,
      ...rest,
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = findSingleItem;
