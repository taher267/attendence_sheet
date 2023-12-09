const holidayService = require("../../../../service/holiday");
const defaults = require("../../../../config/defaults");

const findAllItems = async (req, res, next) => {
  const page = req.query.page || defaults.page;
  const limit = req.query.limit || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const search = req.query.search || defaults.search;
  const searchBy = req.query.searchBy || "";
  const searchType = req.query.searchType || "";

  const { path, url, query } = req;

  try {
    // data
    const { data, ...rest } = await holidayService.findAllItems({
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
      data,
      ...rest,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = findAllItems;
