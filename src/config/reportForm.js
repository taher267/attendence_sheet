const filedTypes = [
  // "button",
  "checkbox",
  "color",
  "date",
  "datetime-local",
  "email",
  "file",
  "hidden",
  "image",
  "month",
  "number",
  "password",
  "radio",
  "range",
  "reset",
  "search",
  "submit",
  "tel",
  "text",
  "textarea",
  "time",
  "url",
  "week",
];
const statuses = ["active", "inactive"];
const defaults = {
  totalItems: 0,
  limit: 10,
  page: 1,
  sortType: "dsc",
  sortBy: "updatedAt",
  search: "",
};

module.exports = Object.freeze({ filedTypes, statuses, defaults });
