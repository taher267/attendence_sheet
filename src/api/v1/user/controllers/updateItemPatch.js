const userService = require("../../../../service/user");
const config = require("../../../../config/user");
const cache = require("../../../../cache");

const updateItemPatch = async (req, res, next) => {
  const { id } = req.params;
  const { roles, status } = req.body;

  try {
    const data = await userService.updateProperties({ id, roles, status });
    const cacheKey = `${config.authUserCachePrefixWithAuth}${id}`;
    if (cache.get(cacheKey)) {
      cache.del(cacheKey);
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
