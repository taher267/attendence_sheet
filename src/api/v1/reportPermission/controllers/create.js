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
  } = req.body;

  try {
    const data = await reportPermissionService.createItem({
      user_id,
      report_form_id,
      status,
      establishment_id,
      department_id,
      holiday_id,
      observer,
    });

    const response = {
      code: 201,
      message: "Report Permission Created Successfully",
      data,
      links: {
        self: `/report-permissions/${data.id}`,
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = create;
