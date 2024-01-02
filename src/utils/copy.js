module.exports = (data) => {
  if (!data || typeof data !== "object") {
    throw new Error(`Please provide valid data!`);
  }
  return JSON.parse(JSON.stringify(data));
};
