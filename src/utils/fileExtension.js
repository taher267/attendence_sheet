module.exports = ({ fileName = "" }) => {
  return require("path").extname(fileName);
};
