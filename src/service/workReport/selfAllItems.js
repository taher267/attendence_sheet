const workReportRepo = require("../../repo/workReport");
const { defaults } = require("../../config/workReport");
const { query } = require("../../utils");
const { badRequest } = require("../../utils/error");
/**
 * Find all users
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
    throw badRequest(`Invalid prameters`);
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
  const selection = [
    "id",
    "name",
    "email",
    "phone_number",
    "username",
    "lastLogin",
    "roles",
    "username",
    "status",
    "createdAt",
    "updatedAt",
  ];

  const users = await workReportRepo.findAllItems({
    qry: filter,
    sortStr,
    limit,
    skip,
    select: selection,
  });
  // .populate({ path: "author", select: "name" })
  console.log(users?.length);
  const data = query.getTransformedItems({
    items: users,
    selection,
    path: "/users",
  });

  // pagination
  const totalItems = await workReportRepo.count({ filter });

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

module.exports = selfAllItems;
