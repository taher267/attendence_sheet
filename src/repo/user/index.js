const { User } = require("../../models");
const quryReplacer = require("../../utils/quryReplacer");

const findAllItems = async ({
  qry = {},
  populate,
  sortStr = "-createdAt",
  skip = 0,
  limit = 10,
  select = "",
}) => {
  qry = quryReplacer(qry);
  let items = [];
  if (populate) {
    items = await User.find(qry)
      .populate({ ...populate })
      .select(select)
      .sort(sortStr)
      .skip(skip)
      .limit(limit);
  } else {
    items = await User.find(qry)
      .select(select)
      .sort(sortStr)
      .skip(skip)
      .limit(limit);
  }
  return items.map((item) => ({
    ...item._doc,
    id: item.id,
  }));
};

const findItem = async ({ qry = {}, select = "" }) => {
  qry = quryReplacer(qry);
  const item = await User.findOne(qry).select(select).exec();
  if (!item) return false;
  const copy = { id: item.id, ...item._doc };
  delete copy._id;
  delete copy.__v;
  return copy;
};
const findItemById = async ({ id, select = "" }) => {
  const item = await User.findById(id).select(select).exec();
  if (!item) return false;
  const copy = { id: item.id, ...item._doc };
  delete copy._id;
  delete copy.__v;
  return copy;
};

const updateItem = async ({ qry = {}, updateData = {}, options = {} }) => {
  qry = quryReplacer(qry);
  const updated = await User.updateOne(qry, updateData, options);
  if (!updated.matchedCount) return false;
  return updated;
};

const updateItemById = async ({ id, updateData = {}, options = {} }) => {
  const updated = await User.findByIdAndUpdate(id, updateData, options);
  if (!updated) return false;
  const copy = { id: updated.id, ...updated._doc };
  delete copy._id;
  return copy;
};

const deleteItem = ({ qry = {} }) => {
  qry = quryReplacer(qry);
  return User.deleteOne(qry);
};

const deleteItemById = ({ id }) => {
  return User.findByIdAndDelete(id);
};

const deleteManyItem = ({ qry = {} }) => {
  qry = quryReplacer(qry);
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
  const created = await User.create(data);
  const copy = { id: created.id, ...created._doc };
  delete copy._id;
  delete copy.password;
  delete copy.__v;
  return copy;
};

const count = ({ filter = {} }) => {
  filter = quryReplacer(filter);
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
