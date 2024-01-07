const Services = require("../../../../service/reportPermission");
// const { query } = require("../../../../utils");
const { defaults } = require("../../../../config/reportPermission");

const selfAllItems = async (req, res, next) => {
  const page = req.query.page || defaults.page;
  const limit = req.query.limit || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const search = req.query.search || defaults.search;
  const searchBy = req.query.searchBy || "";
  const searchType = req.query.searchType || "";
  const expands = req.query.expands || defaults.expands || "report_form";

  //

  const {
    path,
    url,
    query,
    user: { id: user_id },
  } = req;

  try {
    // data
    const { items, ...rest } = await Services.selfAllItems({
      page,
      limit,
      sortType,
      sortBy,
      search,
      searchBy,
      searchType,
      user_id,
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

module.exports = selfAllItems;
