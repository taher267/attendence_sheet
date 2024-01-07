const itemChanger = ({ items = [], keyVals = {} }) => {
  const newArr = [];
  for (const item of items) {
    const val = keyVals[item];
    if (val) {
      newArr.push([val]);
    } else {
      newArr.push([item]);
    }
  }
  return newArr;
};
module.exports = itemChanger;
