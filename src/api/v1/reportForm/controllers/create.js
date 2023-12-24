const reportFormService = require("../../../../service/reportForm");

const create = async (req, res, next) => {
  const { name, fields, status } = req.body;

  try {
    const item = await reportFormService.createItem({
      name,
      fields,
      status,
    });

    const response = {
      code: 201,
      message: "Report form Created Successfully",
      data: item,
      links: {
        self: `/report-forms/${reportForm.id}`,
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = create;
