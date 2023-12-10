const reportPermissionService = require("../../../../service/reportPermission");

const findSingleItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { data, ...rest } = await reportPermissionService.findSingleItem({
      id,
    });
    const response = {
      data,
      ...rest,
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = findSingleItem;
