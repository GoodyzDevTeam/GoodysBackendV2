const mongoose = require("mongoose");
const dotenv = require("dotenv");
//const dotenvExpand = require("dotenv-expand");
const myEnv = dotenv.config();
//dotenvExpand(myEnv);
const { dbHost } = require('../../config');

// Database options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

// Database connection
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(dbHost, options);
    console.log(`** mongodb is connected: ${connect.connection.host}`.america);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDb;
