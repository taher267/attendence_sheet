const Services = require("../../../../service/workReport");
// const { query } = require("../../../../utils");
const defaults = require("../../../../config/defaults");
/**
 * observer only access by his/her assigned
 * admin can see all
 */

const observerByAllItems = async (req, res, next) => {
  const page = req.query.page || defaults.page;
  const limit = req.query.limit || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const search = req.query.search || defaults.search;
  const searchBy = req.query.searchBy || "";
  const searchType = req.query.searchType || "";

  const {
    path,
    url,
    query,
    user: { id: observer },
    params: { report_permission_id, report_form_id },
  } = req;

  try {
    // data
    const { items, ...rest } = await Services.findAllItems({
      page,
      limit,
      sortType,
      sortBy,
      search,
      searchBy,
      searchType,
      request: { path, url, query },
      defaultFilter: { observer, report_form_id, report_permission_id },
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

module.exports = observerByAllItems;
