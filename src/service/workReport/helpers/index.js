const moment = require("moment");

const submitedFormValidation = ({
  submittedNameValues = {},
  workReportForm = [],
}) => {
  const copy = JSON.parse(JSON.stringify(workReportForm));
  let misRequired = false;
  const errors = [];

  for (const W_R_field of workReportForm) {
    const { required, name } = W_R_field;
    if (required) {
      if (!submittedNameValues[name]?.trim?.()) {
        misRequired = true;
        errors.push({ [name]: `${[name]} is mandatory!` });
      } else {
        delete copy[name];
      }
    } else {
      delete copy[name];
    }
  }
  if (Object.keys(copy).length) {
    misRequired = true;
    errors.push({ custom: `Please remove invalid field(s)!` });
  }
  if (misRequired) {
    return { valid: false, errors };
  }
  return { valid: true };
};
//[Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, and Sunday]
const holiday_in_week = ({
  holiday = [
    // "Saturday", "Sunday", "Tuesday", 'Wednesday'
  ],
}) => {
  let next_permission_date = moment().utc().endOf("D").add(12, "hours");
  let findNext = false;
  while (!findNext) {
    const day = next_permission_date.format("dddd");
    if (holiday.includes(day)) {
      next_permission_date = moment(next_permission_date).utc().add(1, "day");
    } else {
      findNext = true;
    }
  }
  return next_permission_date.toISOString();
};
const holiday_in_occasional = ({ holiday = [] }) => {
  let next_permission_date = moment()
    .utc()
    .endOf("D")
    .add(12, "hours")
    .toISOString()
    .slice(0, 10);
  holiday = holiday.map((item) => item.toISOString().slice(0, 10));
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
