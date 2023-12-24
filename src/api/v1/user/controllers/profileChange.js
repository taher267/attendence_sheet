const userService = require("../../../../service/user");

const profileChange = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await userService.profileChange(id, req.body);

    const response = {
      code: 200,
      message: "User updated successfully",
      data,
      links: {
        self: `/users/${data.id}`,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = profileChange;
