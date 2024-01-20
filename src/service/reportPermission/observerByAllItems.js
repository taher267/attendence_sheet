const Repo = require("../../repo/reportPermission");
const { defaults, ref_id_keys } = require("../../config/reportPermission");
const { query } = require("../../utils");
const { badRequest } = require("../../utils/error");
const objectKeyValueSelect = require("../../utils/objectKeyValueSelect");
const itemChanger = require("../../utils/itemChanger");
// Repo.findItem({
//   qry: { id: "65888277a5b2f7bed1785bed", observer: "657b6c4412e9c9d91211d4ab" },
//   populate: [["report_form_id"]],
// })
//   .then(console.log)
//   .catch(console.error);
/**
 * Find all reportForm
 * Pagination
 * Searching
 * Sorting
 * @param{*} param0
 * @returns
 */
const observerByAllItems = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
  searchBy = "",
  searchType = "",
  expands = "",
  request = {},
  user_id,
}) => {
  if (!user_id) {
    throw badRequest();
  }
  const spil = (expands || "").split(",").filter((item) => item);
  const expanding = itemChanger({ items: spil, keyVals: ref_id_keys });
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const filter = { user_id };

  if (searchBy && search) {
    if (searchType === "pattern") {
      filter[searchBy] = { $regex: search, $options: "i" };
    } else if (searchType === "strict") {
      filter[searchBy] = search;
    }
  }

  const skip = page * limit - limit;
  const selection = ["id", "report_form_id"];
  // const selection = ["id", "name", "fields"];

  const items = await Repo.findAllItems({
    qry: filter,
    sortStr,
    limit,
    skip,
    // select: ["report_form_id"],
    populate: expanding, //[["report_form_id"]],
  });

  const filteredItems = [],
    filter_keys = [
      "id",
      "report_form",
      "open_submission_date",
      "status",
      "createdAt",
      "upatedAt",
    ];
  for (const single_item of items) {
    single_item.report_form = single_item.report_form_id;
    delete single_item.report_form_id;
    filteredItems.push(single_item);
  }
  const data = query.getTransformedItems({
    items: filteredItems,
    selection: filter_keys,
    path: "/report-permissions",
  });

  // pagination
  const totalItems = await Repo.count({ filter });

  const pagination = query.getPagination({ totalItems, limit, page });

  // HATEOAS Links
  const links = query.getHATEOASForAllItems({
    url: request.url,
    path: request.path,
    query: request.query,
    hasNext: !!pagination.next,
    hasPrev: !!pagination.prev,
    page,
  });

  return {
    items: data,
    totalItems,
    pagination,
    links,
  };
};

module.exports = observerByAllItems;
