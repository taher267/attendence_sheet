const mongoose = require("mongoose");

const { DB_CONNECTION_URL, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;
let connectionURL = DB_CONNECTION_URL;
connectionURL = connectionURL.replace("<username>", DB_USERNAME);
connectionURL = connectionURL.replace("<password>", DB_PASSWORD);
// console.log(connectionURL);
const connectDB = async () => {
  await mongoose.connect(connectionURL, { dbName: DB_NAME });
  console.log("Database connected");
};

module.exports = connectDB;
