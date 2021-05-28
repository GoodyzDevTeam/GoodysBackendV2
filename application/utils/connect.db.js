const mongoose = require("mongoose");
const dotenv = require("dotenv");
const myEnv = dotenv.config();
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
    mongoose.Promise = Promise;
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    return mongoose.connection;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  return null;
};

module.exports = connectDb;
