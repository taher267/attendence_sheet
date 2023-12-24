const reportPermissionService = require("../../../../service/reportPermission");

const updateItem = async (req, res, next) => {
  const { weekly, monthly, occasional } = req.body;
  const { id } = req.params;

  try {
    const item = await reportPermissionService.updateItem({
      id,
      weekly,
      monthly,
      occasional,
    });

    const response = {
      code: 200,
      message: "Report permission has been updated, Successfully",
      data: { ...item },
      links: {
        self: `/report-permissions/${item.id}`,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateItem;
