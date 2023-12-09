const fieldsFilter = ({ keys = [], values = [] }) => {
  const data = [];
  for (const obj of values) {
    for (const key of keys) {
      const single = {};
      if (obj[key]) {
        single[key] = obj[key];
      }
      if (Object.keys(single).length) {
        data.push(single);
      }
    }
  }
  return data;
};

module.exports = fieldsFilter;
