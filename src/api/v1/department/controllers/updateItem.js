const departmentService = require("../../../../service/department");

const updateItem = async (req, res, next) => {
  const { name, fields, status } = req.body;
  const { id } = req.params;

  try {
    const department = await departmentService.updateItem({
      name,
      fields,
      status,
      id,
    });

    const response = {
      code: 200,
      message: "Report form has been updated, Successfully",
      data: { ...department },
      links: {
        self: `/departments/${department.id}`,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateItem;
