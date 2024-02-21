const workReportService = require("../../../../service/workReport");

const updateItem = async (req, res, next) => {
  const {
    body: { status, report_permission_id },
    user: { id: user_id },
    params: { id },
  } = req;

  try {
    const item = await workReportService.updateItemProperties({
      report_permission_id,
      id,
      user_id,
      status,
    });

    const response = {
      code: 200,
      message: "Report form has been updated, Successfully",
      data: item,
      links: {
        self: `/report-forms/${item.id}`,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateItem;
