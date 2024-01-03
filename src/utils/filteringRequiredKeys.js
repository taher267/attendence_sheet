const stringToRHFRules = require("./stringToRHFRules");

const filteringRequiredKeys = ({ values = [], required = true }) => {
  const allKeys = [];
  for (const obj of values) {
    const validationObj = stringToRHFRules({ data: obj?.validation || "" });
    if (validationObj.required?.value === true) {
      allKeys.push(obj.name);
    }
  }
  return allKeys;
};
module.exports = filteringRequiredKeys;
