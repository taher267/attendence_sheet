const workReportService = require("../../../../service/workReport");

const create = async (req, res, next) => {
  const { report_permission_id, fields, for_submission_date } = req.body;

  try {
    const data = await workReportService.createItem({
      report_permission_id,
      fields,
      for_submission_date,
    });

    const response = {
      code: 201,
      message: "Work Report Created Successfully",
      data,
      links: {
        self: `/work-reports/${data.id}`,
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = create;
