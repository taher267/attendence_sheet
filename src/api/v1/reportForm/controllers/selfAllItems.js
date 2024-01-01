const reportFormService = require("../../../../service/reportForm");
// const { query } = require("../../../../utils");
const { defaults } = require("../../../../config/reportForm");

const selfAllItems = async (req, res, next) => {
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
    user: { id: user_id },
  } = req;

  try {
    // data
    const { items, ...rest } = await reportFormService.selfAllItems({
      page,
      limit,
      sortType,
      sortBy,
      search,
      searchBy,
      searchType,
      user_id,
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

module.exports = selfAllItems;
