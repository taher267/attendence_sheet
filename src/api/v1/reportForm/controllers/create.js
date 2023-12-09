const reportFormService = require("../../../../service/reportForm");

const create = async (req, res, next) => {
  const { name, fields, status } = req.body;

  try {
    const reportForm = await reportFormService.createItem({
      name,
      fields,
      status,
    });

    const response = {
      code: 201,
      message: "Report form Created Successfully",
      data: { ...reportForm },
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
