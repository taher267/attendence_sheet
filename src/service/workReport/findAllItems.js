const Repo = require("../../repo/workReport");
const defaults = require("../../config/defaults");
const { query } = require("../../utils");
/**
 * Find all report-forms
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
  defaultFilter = {},
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  // delete defaultFilter.observer;
  const filter = { ...defaultFilter };

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
    "observer",
    "report_permission_id",
    "report_form_id",
    "fields",
    "for_submission_date",
    "status",
    "createdAt",
    "updatedAt",
  ];

  const items = await Repo.findAllItems({
    qry: filter,  
    sortStr,
    limit,
    skip,
    select: selection,
  });

  console.log(items?.length, { filter });
  const data = query.getTransformedItems({
    items,
    selection,
    path: "/work-reports",
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
    data,
    totalItems,
    pagination,
    links,
  };
};

module.exports = findAllItems;
