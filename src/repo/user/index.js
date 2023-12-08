const { User } = require("../../models");

const findAllItems = async ({
  qry = {},
  populate,
  sortStr = "-createdAt",
  skip = 0,
  limit = 10,
  select = "",
}) => {
  let users = [];
  if (populate) {
    users = await User.find(qry)
      .populate({ ...populate })
      .select(select)
      .sort(sortStr)
      .skip(skip)
      .limit(limit);
  } else {
    users = await User.find(qry)
      .select(select)
      .sort(sortStr)
      .skip(skip)
      .limit(limit);
  }
  return users.map((user) => ({
    ...user._doc,
    id: user.id,
  }));
};

const findItem = async ({ qry = {}, select = "" }) => {
  const user = await User.findOne(qry).select(select).exec();
  if (!user) return false;
  const copy = { id: user.id, ...user._doc };
  delete copy._id;
  delete copy.__v;
  return copy;
};
const findItemById = async ({ id, select = "" }) => {
  const user = await User.findById(id).select(select).exec();
  if (!user) return false;
  const copy = { id: user.id, ...user._doc };
  delete copy._id;
  delete copy.__v;
  return copy;
};

const updateItem = async ({ qry = {}, updateDate = {}, options = {} }) => {
  const updated = await User.updateOne(qry, updateDate, options);
  if (!updated.matchedCount) return false;
  return updated;
};

const updateItemById = async ({ id, updateDate = {}, options = {} }) => {
  const updated = await User.findByIdAndUpdate(id, updateDate, options);
  if (!updated) return false;
  const copy = { id: updated.id, ...updated._doc };
  delete copy._id;
  return copy;
};

const deleteItem = ({ qry = {} }) => {
  return User.deleteOne(qry);
};

const deleteItemById = ({ id }) => {
  return User.findByIdAndDelete(id);
};

const deleteManyItem = ({ qry = {} }) => {
  return User.deleteMany(qry);
};

const createNewItem = async ({ data }) => {
  const newData = new User(data);
  await newData.save();
  const copy = newData._doc;
  delete copy._id;
  return { id: newData.id, ...copy };
};

const create = async ({ ...data }) => {
  const user = await User.create(data);
  const copy = { id: user.id, ...user._doc };
  delete copy._id;
  delete copy.password;
  delete copy.__v;
  return copy;
};

const count = ({ filter }) => {
  return User.countDocuments(filter);
};

module.exports = {
  createNewItem,
  create,
  count,
  findAllItems,
  findItem,
  findItemById,
  updateItem,
  updateItemById,
  deleteItem,
  deleteItemById,
  deleteManyItem,
};
