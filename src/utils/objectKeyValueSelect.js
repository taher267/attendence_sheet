/* eslint-disable valid-typeof */
/* eslint-disable no-unused-vars */
module.exports = ({
  data = {},
  select = [],
  emptyReplace = null,
  key_replace = {},
}) => {
  const selected = {};

  for (const item of select) {
    const val = data[item];
    if (val === null || val === undefined) {
      // nothing
    } else {
      if (val) {
        if (key_replace[item]) {
          selected[key_replace[item]] = val;
        } else {
          selected[item] = val;
        }
      } else if (emptyReplace == undefined || emptyReplace == null) {
        if (key_replace[item]) {
          selected[key_replace[item]] = val;
        } else {
          selected[item] = val;
        }
      } else {
        if (key_replace[item]) {
          selected[key_replace[item]] = emptyReplace;
        } else {
          selected[item] = emptyReplace;
        }
        
      }
    }
  }

  return selected;
};
