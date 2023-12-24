const reportPermissionService = require("../../../../service/reportPermission");

const create = async (req, res, next) => {
  const {
    user_id,
    report_form_id,
    status,
    establishment_id,
    department_id,
    holiday_id,
    observer,
    open_submission_date,
  } = req.body;

  try {
    const item = await reportPermissionService.createItem({
      user_id,
      report_form_id,
      status,
      establishment_id,
      department_id,
      holiday_id,
      observer,
      open_submission_date,
    });

    const response = {
      code: 201,
      message: "Report Permission Created Successfully",
      data: item,
      links: {
        self: `/report-permissions/${item.id}`,
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = create;
