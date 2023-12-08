const userService = require("../../../../service/user");

const findSingleItem = async (req, res, next) => {
  const id = req.params.id;

  try {
    const { user, ...rest } = await userService.findSingleItem({
      id,
    });
    const response = {
      user,
      ...rest,
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = findSingleItem;
