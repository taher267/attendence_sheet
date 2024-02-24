const workReportService = require("../../../../service/workReport");

const updateItemPropertiesByObserver = async (req, res, next) => {
  const {
    body: { status, report_permission_id },
    user: { id: user_id },
    params: { id },
  } = req;
  const defaultQuery = {
    observer: user_id,
    id,
  };

  try {
    const item = await workReportService.updateItemProperties({
      report_permission_id,
      id,
      user_id,
      status,
      defaultQuery,
    });

    const response = {
      code: 200,
      message: "Work report has been updated, Successfully",
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

module.exports = updateItemPropertiesByObserver;
