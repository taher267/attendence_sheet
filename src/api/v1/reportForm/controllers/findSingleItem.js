const Services = require("../../../../service/reportForm");

const findSingleItem = async (req, res, next) => {
  const id = req.params.id;

  try {
    const { item, ...rest } = await Services.findSingleItem({
      id,
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
