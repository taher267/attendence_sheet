const reportPermissionRepo = require("../../repo/reportPermission");
const { defaults, ref_id_keys } = require("../../config/reportPermission");
const { query } = require("../../utils");
const itemChanger = require("../../utils/itemChanger");

/**
 * Find all items
 * Pagination
 * Searching
 * Sorting
 * @param{*} param0
 * @returns
 */
const findAllItems = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
  searchBy = "",
  searchType = "",
  expands = "",
  request = {},
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const filter = {};

  const spil = (expands || "").split(",").filter((item) => item);
  const expanding = itemChanger({ items: spil, keyVals: ref_id_keys });
  if (searchBy && search) {
    if (searchType === "pattern") {
      filter[searchBy] = { $regex: search, $options: "i" };
    } else if (searchType === "strict") {
      filter[searchBy] = search;
    }
  }

  const skip = page * limit - limit;
  const selection = [
    "id",
    "user_id",
    "report_form_id",
    "establishment_id",
    "department_id",
    "holiday_id",
    "observer",
  ];

  const items = await reportPermissionRepo.findAllItems({
    qry: filter,
    sortStr,
    limit,
    skip,
    select: selection,
    populate: expanding,
  });
  console.log(items?.length);
  const data = query.getTransformedItems({
    items: items,
    selection,
    path: "/report-permissions",
  });

  // pagination
  const totalItems = await reportPermissionRepo.count({ filter });

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

module.exports = findAllItems;
