const holidayService = require("../../../../service/holiday");
// holidayService
//   .createItem({
//     weekly: [4],
//     name:"Taher Tweetsy"
//   })
//   .then(console.log)
//   .catch(console.error);
const create = async (req, res, next) => {
  const { name, weekly, monthly, occasional, individual } = req.body;

  try {
    const data = await holidayService.createItem({
      name,
      weekly,
      monthly,
      occasional,
      individual,
    });

    const response = {
      code: 201,
      message: "Report form Created Successfully",
      data,
      links: {
        self: `/holidays/${data.id}`,
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = create;
