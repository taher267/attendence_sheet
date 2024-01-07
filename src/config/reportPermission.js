const statuses = ["open", "close"];
const defaults = {
  totalItems: 0,
  limit: 10,
  page: 1,
  sortType: "dsc",
  sortBy: "updatedAt",
  search: "",
};
const ref_id_keys = {
  user: "user_id",
  observer: "observer",
  establishment: "establishment_id",
  department: "department_id",
  holiday: "holiday_id",
  report_form: "report_form_id",
};
module.exports = Object.freeze({ statuses, defaults, ref_id_keys });
