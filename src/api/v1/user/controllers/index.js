const create = require("./create");
const findAllItems = require("./findAllItems");
const findSingleItem = require("./findSingleItem");
const updateItem = require("./updateItem");
const updateItemPatch = require("./updateItemPatch");
const removeItem = require("./removeItem");
const profileChange = require("./profileChange");
const updatePassword = require("./updatePassword");
const setPassword = require("./setPassword");
const changeProfilePic = require("./changeProfilePic.js");
const mine=require('./mine')

module.exports = {
  findAllItems,
  create,
  findSingleItem,
  updateItem,
  updateItemPatch,
  removeItem,
  profileChange,
  setPassword,
  updatePassword,
  changeProfilePic,
  mine
};
