const reportFormService = require("../../../../service/reportForm");

const updateItem = async (req, res, next) => {
  const { name, fields, status } = req.body;
  const { id } = req.params;

  try {
    const reportForm = await reportFormService.updateItem({
      name,
      fields,
      status,
      id,
    });

    const response = {
      code: 200,
      message: "Report form has been updated, Successfully",
      data: { ...reportForm },
      links: {
        self: `/report-forms/${reportForm.id}`,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateItem;
