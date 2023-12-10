const reportPermissionService = require("../../../../service/reportPermission");

const updateItem = async (req, res, next) => {
  const { weekly, monthly, occasional } = req.body;
  const { id } = req.params;

  try {
    const data = await reportPermissionService.updateItem({
      id,
      weekly,
      monthly,
      occasional,
    });

    const response = {
      code: 200,
      message: "Report permission has been updated, Successfully",
      data: { ...data },
      links: {
        self: `/report-permissions/${data.id}`,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateItem;
