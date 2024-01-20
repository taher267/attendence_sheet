const { ReportPermission } = require("../../models");
const { ObjectId } = require("mongodb");
const quryReplacer = require("../../utils/quryReplacer");
const copy = require("../../utils/copy");
const keyReplacer = require("../../utils/keyReplacer");

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
    items = await ReportPermission.find(qry)
      .populate(...(populate?.[0] || []))
      .populate(...(populate?.[1] || []))
      .populate(...(populate?.[2] || []))
      .populate(...(populate?.[3] || []))
      .populate(...(populate?.[4] || []))
      .populate(...(populate?.[5] || []))
      .select(select)
      .sort(sortStr)
      .skip(skip)
      .limit(limit);
  } else {
    items = await ReportPermission.find(qry)
      .select(select)
      .sort(sortStr)
      .skip(skip)
      .limit(limit);
  }
  return items.map((item) => {
    const replacedItem = keyReplacer(item?._doc);

    return {
      ...replacedItem,
      id: item.id,
    };
  });
};

const itemAggregation = async ({
  qry = {},
  populate,
  sortStr = "-createdAt",
  skip = 0,
  limit = 10,
  select = "",
  filtering = {},
}) => {
  
  const data = await ReportPermission.aggregate([
    {
      $match: {
        ...filtering,
        // observer: new ObjectId("657b6c4412e9c9d91211d4ab"),
        // _id: new ObjectId("65888277a5b2f7bed1785bed"),
      },
    },
    {
      $lookup: {
        from: "workreports",
        localField: "_id",
        foreignField: "report_permission_id",
        as: "workreports",
      },
    },
    // { $unwind: "$WorkReports" },
    // {
    //   $lookup: {
    //     from: "reportforms",
    //     localField: "report_form_id",
    //     foreignField: "_id",
    //     as: "reportForms",
    //   },
    // },
    // { $unwind: "$reportForms" },
    // {
    //   $lookup: {
    //     from: "users",
    //     localField: "user_id",
    //     foreignField: "_id",
    //     as: "Users",
    //   },
    // },
    // { $unwind: "$Users" },

    // {
    //   $lookup: {
    //     from: "users",
    //     localField: "observer_id",
    //     foreignField: "_id",
    //     as: "Observer",
    //   },
    // },
    // {
    //   $lookup: {
    //     from: "establishments",
    //     localField: "establishment_id",
    //     foreignField: "_id",
    //     as: "Establishment",
    //   },
    // },
    // {
    //   $lookup: {
    //     from: "departments",
    //     localField: "department_id",
    //     foreignField: "_id",
    //     as: "department",
    //   },
    // },
    // {
    //   $lookup: {
    //     from: "holidays",
    //     localField: "holiday_id",
    //     foreignField: "_id",
    //     as: "holiday",
    //   },
    // },
  ]);
  console.log(data?.[0]);
};

// itemAggregation({ qry: {} })
//   .then((d) => {
//     console.log(d?.[0]);
//   })
//   .catch(console.error);

const findItem = async ({ qry = {}, select = "", populate }) => {
  qry = quryReplacer(qry);
  const item = await ReportPermission.findOne(qry)
    .populate(...(populate?.[0] || []))
    .populate(...(populate?.[1] || []))
    .populate(...(populate?.[2] || []))
    .populate(...(populate?.[3] || []))
    .populate(...(populate?.[4] || []))
    .populate(...(populate?.[5] || []))
    .select(select)
    .exec();
  if (!item) return false;
  const copy = { id: item.id, ...item._doc };
  delete copy._id;
  delete copy.__v;
  return copy;
};

const findItemById = async ({ id, select = "", populate }) => {
  const item = await ReportPermission.findById(id)
    .populate(...(populate?.[0] || []))
    .populate(...(populate?.[1] || []))
    .populate(...(populate?.[2] || []))
    .populate(...(populate?.[3] || []))
    .populate(...(populate?.[4] || []))
    .populate(...(populate?.[5] || []))
    .select(select);
  if (!item) return false;
  const replaced = keyReplacer(item._doc);
  const copy = { id: item.id, ...replaced };
  delete copy._id;
  delete copy.__v;
  return copy;
};

const updateItem = async ({ qry = {}, updateDate = {}, options = {} }) => {
  if (
    !qry ||
    !Object.keys(qry)?.length ||
    !updateDate ||
    !Object.keys(updateDate)?.length
  ) {
    throw new Error(`Please provide data!`);
  }
  qry = quryReplacer(qry);
  const updated = await ReportPermission.updateOne(qry, updateDate, options);
  if (!updated.matchedCount) return false;
  return updated;
};

const updateItemById = async ({ id, updateDate = {}, options = {} }) => {
  if (!updateDate || !Object.keys(updateDate)?.length) {
    throw new Error(`Please provide data!`);
  }
  const updated = await ReportPermission.findByIdAndUpdate(
    id,
    updateDate,
    options
  );
  if (!updated) return false;
  const copy = { id: updated.id, ...updated._doc };
  delete copy._id;
  return copy;
};

const deleteItem = ({ qry = {} }) => {
  if (!qry || !Object.keys(qry)?.length) {
    throw new Error(`Please provide data!`);
  }
  qry = quryReplacer(qry);
  return ReportPermission.deleteOne(qry);
};

const deleteItemById = ({ id }) => {
  return ReportPermission.findByIdAndDelete(id);
};

const deleteManyItem = ({ qry = {} }) => {
  if (!qry || !Object.keys(qry)?.length) {
    throw new Error(`Please provide data!`);
  }
  qry = quryReplacer(qry);
  return ReportPermission.deleteMany(qry);
};

const createNewItem = async ({ data }) => {
  if (!data || !Object.keys(data)?.length) {
    throw new Error(`Please provide data!`);
  }
  const newData = new ReportPermission(data);
  await newData.save();
  const copy = newData._doc;
  delete copy._id;
  return { id: newData.id, ...copy };
};

const create = async ({ ...data }) => {
  if (!data || !Object.keys(data)?.length) {
    throw new Error(`Please provide data!`);
  }
  const updated = await ReportPermission.create(data);
  const copy = { id: updated.id, ...updated._doc };
  delete copy._id;
  delete copy.password;
  delete copy.__v;
  return copy;
};

const count = ({ filter }) => {
  return ReportPermission.countDocuments(filter);
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
  itemAggregation,
};
