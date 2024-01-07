const reportPermissionService = require("../../../../service/reportPermission");
const defaults = require("../../../../config/defaults");

const findAllItems = async (req, res, next) => {
  const page = req.query.page || defaults.page;
  const limit = req.query.limit || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const search = req.query.search || defaults.search;
  const searchBy = req.query.searchBy || "";
  const searchType = req.query.searchType || "";
  const expands = req.query.expands || defaults?.search || "";
  // const expand = `user_id,observer,establishment_id,department_id,holiday_id,report_form_id`;

  const { path, url, query } = req;

  try {
    // data
    const { items, ...rest } = await reportPermissionService.findAllItems({
      page,
      limit,
      sortType,
      sortBy,
      search,
      searchBy,
      searchType,
      expands,
      request: { path, url, query },
    });

    res.status(200).json({
      code: 200,
      data: items,
      ...rest,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = findAllItems;
