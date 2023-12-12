const { Holiday } = require("../../models");
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
    items = await Holiday.find(qry)
      .populate({ ...populate })
      .select(select)
      .sort(sortStr)
      .skip(skip)
      .limit(limit);
  } else {
    items = await Holiday.find(qry)
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
  const item = await Holiday.findOne(qry).select(select).exec();
  if (!item) return false;
  const copy = { id: item.id, ...item._doc };
  delete copy._id;
  delete copy.__v;
  return copy;
};

const findItemById = async ({ id, select = "" }) => {
  const item = await Holiday.findById(id).select(select).exec();
  if (!item) return false;
  const copy = { id: item.id, ...item._doc };
  delete copy._id;
  delete copy.__v;
  return copy;
};

const updateItem = async ({ qry = {}, updateDate = {}, options = {} }) => {
  qry = quryReplacer(qry);
  const updated = await Holiday.updateOne(qry, updateDate, options);
  if (!updated.matchedCount) return false;
  return updated;
};

const updateItemById = async ({ id, updateDate = {}, options = {} }) => {
  const updated = await Holiday.findByIdAndUpdate(id, updateDate, options);
  if (!updated) return false;
  const copy = { id: updated.id, ...updated._doc };
  delete copy._id;
  return copy;
};

const deleteItem = ({ qry = {} }) => {
  qry = quryReplacer(qry);
  return Holiday.deleteOne(qry);
};

const deleteItemById = ({ id }) => {
  return Holiday.findByIdAndDelete(id);
};

const deleteManyItem = ({ qry = {} }) => {
  qry = quryReplacer(qry);
  return Holiday.deleteMany(qry);
};

const createNewItem = async ({ data }) => {
  const newData = new Holiday(data);
  await newData.save();
  const copy = newData._doc;
  delete copy._id;
  return { id: newData.id, ...copy };
};

const create = async ({ ...data }) => {
  const updated = await Holiday.create(data);
  const copy = { id: updated.id, ...updated._doc };
  delete copy._id;
  delete copy.password;
  delete copy.__v;
  return copy;
};

const count = ({ filter = {} }) => {
  filter = quryReplacer(filter);
  return Holiday.countDocuments(filter);
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
