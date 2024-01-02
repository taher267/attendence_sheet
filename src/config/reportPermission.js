const statuses = ["open", "close"];
const defaults = {
  totalItems: 0,
  limit: 10,
  page: 1,
  sortType: "dsc",
  sortBy: "updatedAt",
  search: "",
};
module.exports = Object.freeze({ statuses, defaults });
