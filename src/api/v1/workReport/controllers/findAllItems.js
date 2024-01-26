const Services = require("../../../../service/workReport");
// const { query } = require("../../../../utils");
const { defaults } = require("../../../../config/workReport");
/**
 * observer only access by his/her assigned
 * admin can see all
 */
const findAllItems = async (req, res, next) => {
  const page = req.query.page || defaults.page;
  const limit = req.query.limit || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const search = req.query.search || defaults.search;
  const searchBy = req.query.searchBy || "";
  const searchType = req.query.searchType || "";
  // const viewType = req.query.viewType || defaults.viewType;

  const { path, url, query } = req;

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
