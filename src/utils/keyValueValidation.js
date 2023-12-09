const keyValueValidation = ({ keys = [], values = [] }) => {
  let isValid = true;
  for (const obj of values) {
    for (const key of keys) {
      if (!obj[key]) {
        isValid = false;
        break;
      }
    }
    if (!isValid) {
      break;
    }
  }
  return isValid;
};

module.exports = keyValueValidation;
