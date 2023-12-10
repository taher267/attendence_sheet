const reportFormService = require("../../../../service/reportForm");

const removeItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    await reportFormService.removeItem({ id });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = removeItem;
