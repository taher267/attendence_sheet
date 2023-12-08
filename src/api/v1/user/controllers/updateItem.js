const userService = require("../../../../service/user");

const updateItem = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone_number, username, lastLogin, roles, status } =
    req.body;

  try {
    const { user, code } = await userService.updateOrCreate(id, {
      id,
      data: {
        name,
        email,
        phone_number,
        username,
        lastLogin,
        roles,
        status,
      },
    });

    const response = {
      code,
      message:
        code === 200
          ? "user updated successfully"
          : "user created successfully",
      data: user,
      links: {
        self: `/users/${user.id}`,
      },
    };

    res.status(code).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateItem;
