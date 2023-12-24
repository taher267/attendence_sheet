const workReportService = require("../../../../service/workReport");

const findSingleItem = async (req, res, next) => {
  const id = req.params.id;
  const { searchfor } = req.query;

  try {
    const { item, ...rest } = await workReportService.findSingleItem({
      id,
      user_id,
      user: req.user,
      searchfor,
    });
    const response = {
      data: item,
      ...rest,
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = findSingleItem;
