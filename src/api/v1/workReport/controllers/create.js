const Services = require("../../../../service/workReport");

const create = async (req, res, next) => {
  const {
    body: { report_permission_id, fields, for_submission_date },
    user: { id: user_id },
  } = req;

  try {
    const item = await Services.createItem({
      report_permission_id,
      fields,
      for_submission_date,
      user_id,
    });

    const response = {
      code: 201,
      message: "Work Report Created Successfully",
      data: item,
      links: {
        self: `/work-reports/${item.id}`,
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = create;
