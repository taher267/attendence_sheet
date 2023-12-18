const departmentService = require("../../../../service/department");

const removeItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    await departmentService.removeItem({ id });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = removeItem;
