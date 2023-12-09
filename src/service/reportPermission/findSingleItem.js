const { isValidObjectId } = require("mongoose");
const reportPermissionRepo = require("../../repo/reportPermission");
const { notFound, badRequest } = require("../../utils/error");

const findSingleItem = async ({
  id,
}) => {
  if (!id || !isValidObjectId(id)) throw badRequest(`Invalid user id!`);
  const user = await reportPermissionRepo.findItemById({ id });
  if (!user) throw notFound();

  return {
    user,
    links: {
      self: `/users/${user.id}`,
    },
  };
};

module.exports = findSingleItem;
