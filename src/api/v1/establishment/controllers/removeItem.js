const establishmentService = require("../../../../service/establishment");

const removeItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    await establishmentService.removeItem({ id });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = removeItem;
