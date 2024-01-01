const Repo = require("../../repo/reportPermission");
const defaults = require("../../config/defaults");
const { query } = require("../../utils");
const { badRequest } = require("../../utils/error");
const objectKeyValueSelect = require("../../utils/objectKeyValueSelect");
/**
 * Find all reportForm
 * Pagination
 * Searching
 * Sorting
 * @param{*} param0
 * @returns
 */
const selfAllItems = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
  searchBy = "",
  searchType = "",
  request = {},
  user_id,
}) => {
  if (!user_id) {
    throw badRequest();
  }
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
    populate: [["report_form_id"]],
  });
  const filteredItems = [],
    filter_keys = ["fields", "name", "status", "createdAt", "upatedAt"];
  for (const single_item of items) {
    filteredItems.push(
      objectKeyValueSelect({
        data: single_item?.report_form_id,
        select: ["_id", ...filter_keys],
        key_replace: { _id: "id" },
      })
    );
  }
  // console.log(filteredItems);
  const data = query.getTransformedItems({
    items: filteredItems,
    selection: ["id", ...filter_keys],
    path: "/report-forms",
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

module.exports = selfAllItems;
