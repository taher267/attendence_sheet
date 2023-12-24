const userService = require("../../../../service/user");

const create = async (req, res, next) => {
  const {
    name,
    email,
    password,
    phone_number,
    username,
    // passwordAllow,
    roles,
  } = req.body;

  try {
    const data = await userService.createItem({
      name,
      email,
      password,
      phone_number,
      username,
      // passwordAllow,
      roles,
      // status
    });

    const response = {
      code: 201,
      message: "Users Created Successfully",
      data,
      links: {
        self: `/users/${data.id}`,
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = create;
