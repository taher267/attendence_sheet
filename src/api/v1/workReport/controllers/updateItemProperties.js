const workReportService = require("../../../../service/workReport");

const updateItem = async (req, res, next) => {
  const {
    body: { status, report_permission_id },
    user: { id: user_id },
  } = req;
  const { id } = req.params;

  try {
    const updated = await workReportService.updateItemProperties({
      report_permission_id,
      id,
      user_id,
      status,
    });

    const response = {
      code: 200,
      message: "Report form has been updated, Successfully",
      data: { ...updated },
      links: {
        self: `/report-forms/${updated.id}`,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateItem;
