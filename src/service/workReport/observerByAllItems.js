const workReportRepo = require("../../repo/workReport");
const { defaults } = require("../../config/workReport");
const { query } = require("../../utils");
const { badRequest } = require("../../utils/error");
const { isValidObjectId } = require("mongoose");
/**
 * Find all users
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
  request = {},
  // user_id,
  observer,
  report_form_id,
  report_prmission_id,
}) => {
  if (
    !observer ||
    !report_form_id ||
    !report_prmission_id ||
    !isValidObjectId(observer) ||
    !isValidObjectId(report_prmission_id)
  ) {
    throw badRequest(`Invalid prameters`);
  }
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const filter = { observer, report_form_id, report_prmission_id };

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
    "report_permission_id",
    "report_form_id",
    "fields",
    "for_submission_date",
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

module.exports = observerByAllItems;
