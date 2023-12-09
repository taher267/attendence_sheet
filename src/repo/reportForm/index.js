const { ReportForm } = require("../../models");
const quryReplacer = require("../../utils/quryReplacer");


const findAllItems = async ({
  qry = {},
  populate,
  sortStr = "-createdAt",
  skip = 0,
  limit = 10,
  select = "",
}) => {
  let items = [];
  qry = quryReplacer(qry);
  if (populate) {
    items = await ReportForm.find(qry)
      .populate({ ...populate })
      .select(select)
      .sort(sortStr)
      .skip(skip)
      .limit(limit);
  } else {
    items = await ReportForm.find(qry)
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
  const item = await ReportForm.findOne(qry).select(select).exec();
  if (!item) return false;
  const copy = { id: item.id, ...item._doc };
  delete copy._id;
  delete copy.__v;
  return copy;
};

const findItemById = async ({ id, select = "" }) => {
  const item = await ReportForm.findById(id).select(select).exec();
  if (!item) return false;
  const copy = { id: item.id, ...item._doc };
  delete copy._id;
  delete copy.__v;
  return copy;
};

const updateItem = async ({ qry = {}, updateDate = {}, options = {} }) => {
  qry = quryReplacer(qry);
  const updated = await ReportForm.updateOne(qry, updateDate, options);
  if (!updated.matchedCount) return false;
  return updated;
};

const updateItemById = async ({ id, updateDate = {}, options = {} }) => {
  const updated = await ReportForm.findByIdAndUpdate(id, updateDate, options);
  if (!updated) return false;
  const copy = { id: updated.id, ...updated._doc };
  delete copy._id;
  return copy;
};

const deleteItem = ({ qry = {} }) => {
  qry = quryReplacer(qry);
  return ReportForm.deleteOne(qry);
};

const deleteItemById = ({ id }) => {
  return ReportForm.findByIdAndDelete(id);
};

const deleteManyItem = ({ qry = {} }) => {
  qry = quryReplacer(qry);
  return ReportForm.deleteMany(qry);
};

const createNewItem = async ({ data }) => {
  const newData = new ReportForm(data);
  await newData.save();
  const copy = newData._doc;
  delete copy._id;
  return { id: newData.id, ...copy };
};

const create = async ({ ...data }) => {
  const created = await ReportForm.create(data);
  const copy = { id: created.id, ...created._doc };
  delete copy._id;
  delete copy.password;
  delete copy.__v;
  return copy;
};

const count = ({ filter }) => {
  return ReportForm.countDocuments(filter);
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
