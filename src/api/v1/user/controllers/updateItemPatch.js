const { isValidObjectId } = require("mongoose");
const userService = require("../../../../service/user");
const { badRequest } = require("../../../../utils/error");

const updateItemPatch = async (req, res, next) => {
  const { id } = req.params;
  const { roles, status } = req.body;

  try {
    const data = await userService.updateProperties({ id, roles, status });
    if (!id || !isValidObjectId(id)) {
      throw badRequest(`Invalid id!`);
    }
    const response = {
      code: 200,
      message: "user updated successfully",
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

module.exports = updateItemPatch;
