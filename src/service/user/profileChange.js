const userRepo = require("../../repo/user");
const { badRequest } = require("../../utils/error");
const profileChange = async (id, { name, username, phone_number }) => {
  const user = await userRepo.findItemById({ id });
  if (!user) {
    throw notFound();
  }

  const payload = {};
  if (name) {
    payload.name = name;
  }

  const qry = [];
  if (username) {
    payload.username = username;
    qry.push({ username });
  }

  if (phone_number) {
    payload.phone_number = phone_number;
    qry.push({ phone_number });
  }

  if (!Object.keys(payload).length) {
    throw badRequest(`Nothing to be changed!`);
  }

  if (qry?.length) {
    const existUser = await userRepo.findItem({ qry: { $or: qry } });
    if (existUser || existUser.id !== id) {
      throw badRequest();
    }
  }

  const updated = await userRepo.updateItemById({
    id,
    updateData: payload,
    options: { new: true },
  });

  return updated;
};

module.exports = profileChange;
