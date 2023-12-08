const createItem = require("./createItem");
const findAllItems = require("./findAllItems");
const findSingleItem = require("./findSingleItem");
const profileChange = require("./profileChange");
const updateProperties = require("./updateProperties");
const removeItem = require("./removeItem");
const updateOrCreate = require("./updateOrCreate");
const setPassword = require("./setPassword");
const updatePassword = require("./updatePassword");
const changeProfilePic = require("./changeProfilePic");

module.exports = {
  createItem,
  findAllItems,
  findSingleItem,
  removeItem,
  updateOrCreate,
  updateProperties,
  profileChange,
  setPassword,
  updatePassword,
  changeProfilePic,
};
