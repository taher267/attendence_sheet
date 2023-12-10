const reportPermissionService = require("../../../../service/reportPermission");

const removeItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    await reportPermissionService.removeItem({ id });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = removeItem;
