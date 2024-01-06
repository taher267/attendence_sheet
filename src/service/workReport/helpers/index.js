const moment = require("moment");
const copy = require("../../../utils/copy");
const stringToRHFRules = require("../../../utils/stringToRHFRules");

const submitedFormValidation = ({ data = {}, compare_with = [] }) => {
  const errors = [];
  let valid = true;
  const copied = copy(data);
  for (const field of compare_with) {
    const { name } = field;
    if (field?.validation) {
      const { required, pattern } =
        stringToRHFRules({ data: field?.validation }) || {};
      const val = data[name];
      if (required?.value === true) {
        if (
          val === "" ||
          val === undefined ||
          val === null ||
          !val?.toString?.()?.trim?.()
        ) {
          valid = false;
          errors.push({ [name]: required.message || `${name} is mandatory!` });
        }
        // after checking delete this field
        // delete copied[name];
      }
      if (pattern?.value && !new RegExp(pattern.value).test(val)) {
        valid = false;
        errors.push({ [name]: pattern.message || `${name} is invalid!` });
      }
      // after checking delete this field
      delete copied[name];
    } else {
      delete copied[name];
    }
  }
  if (Object.keys(copied || {}).length) {
    valid = false;
    for (const single of Object.keys(copied || {})) {
      errors.push({ [single]: `${single} are not allow` });
    }
  }
  return { valid, errors };
};
//[Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, and Sunday]
const holiday_in_week = ({
  holiday = [
    // 0-6
  ],
  next,
}) => {
  let next_permission_date = moment(next).utc().endOf("D").add(12, "hours");
  let findNext = false;
  while (!findNext) {
    const day = next_permission_date.format("d");
    // console.log({ day }, holiday.includes(day));
    if (holiday.includes(day)) {
      next_permission_date = moment(next_permission_date).utc().add(1, "day");
    } else {
      findNext = true;
    }
  }
  return next_permission_date.toISOString();
};
const holiday_in_occasional = ({ holiday = [], next }) => {
  let next_permission_date = moment(next)
    .utc()
    .endOf("D")
    .add(12, "hours")
    .toISOString()
    .slice(0, 10);
  holiday = holiday.map((item) => item.slice(0, 10));
  // holiday = holiday.map((item) => item.toISOString().slice(0, 10));
  let findNext = false;
  while (!findNext) {
    if (holiday.join(",").includes(next_permission_date)) {
      next_permission_date = moment(next_permission_date).utc().add(1, "day");
    } else {
      findNext = true;
    }
  }
  return `${next_permission_date}T12:00:00.000Z`;
};

module.exports = {
  submitedFormValidation,
  holiday_in_week,
  holiday_in_occasional,
};
