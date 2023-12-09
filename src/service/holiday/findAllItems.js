const holidayRepo = require("../../repo/holiday");
const defaults = require("../../config/defaults");
const { query } = require("../../utils");
/**
 * Find all users
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
  request = {},
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const filter = {};

  if (searchBy && search) {
    if (searchType === "pattern") {
      filter[searchBy] = { $regex: search, $options: "i" };
    } else if (searchType === "strict") {
      filter[searchBy] = search;
    }
  }

  const skip = page * limit - limit;
  const selection = ["weekly", "monthly", "occasional"];

  const items = await holidayRepo.findAllItems({
    qry: filter,
    sortStr,
    limit,
    skip,
    select: selection,
  });
  // .populate({ path: "author", select: "name" })
  console.log(items?.length);
  const data = query.getTransformedItems({
    items: items,
    selection,
    path: "/holidays",
  });

  // pagination
  const totalItems = await holidayRepo.count({ filter });

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
    data,
    totalItems,
    pagination,
    links,
  };
};

module.exports = findAllItems;
