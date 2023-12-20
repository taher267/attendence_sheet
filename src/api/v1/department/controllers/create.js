const departmentService = require("../../../../service/department");

// departmentService
//   .createItem({ name: "TAher", establishment_id: "65808706e750347c2485ff24" })
//   .then(console.log)
//   .catch(console.error);

const create = async (req, res, next) => {
  const { name, establishment_id } = req.body;

  try {
    const item = await departmentService.createItem({
      name,
      establishment_id,
    });

    const response = {
      code: 201,
      message: "Department Created Successfully",
      data: { ...item },
      links: {
        self: `/departments/${item.id}`,
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = create;
