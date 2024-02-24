const { isValidObjectId } = require("mongoose");
const { badRequest } = require("./error");

const objectIdsChecker = ({ data = {}, ignores = [] }) => {
  const idsKey = Object.keys(data || {});
  if (!idsKey.length) {
    throw new Error(`Nothing to check!`);
  }
  for (const key of idsKey) {
    if (ignores.includes(key)) {
      continue;
    } else if (!key?.includes?.("_id") && !isValidObjectId(data[key])) {
      throw badRequest(`Invalid params id!`);
    }
  }
  return true;
};

module.exports = objectIdsChecker;
