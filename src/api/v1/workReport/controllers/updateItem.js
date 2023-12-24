const workReportService = require("../../../../service/workReport");

const updateItem = async (req, res, next) => {
  const {
    body: { fields, report_permission_id },
    user: { id: user_id },
  } = req;
  const { id } = req.params;

  try {
    const item = await workReportService.updateItem({
      fields,
      report_permission_id,
      id,
      user_id,
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
