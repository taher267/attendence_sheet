const userService = require("../../../../service/user");

const updateItemPatch = async (req, res, next) => {
  const { id } = req.params;
  const { roles, status } = req.body;

  try {
    const user = await userService.updateProperties({ id, roles, status });

    const response = {
      code: 200,
      message: "user updated successfully",
      data: user,
      links: {
        self: `/users/${user.id}`,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateItemPatch;
