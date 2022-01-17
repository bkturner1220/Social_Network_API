const { connect, connection } = require('mongoose');
const mongoose = require("mongoose");

require('dotenv').config();

const DB_CLUSTER = process.env.DB_CLUSTER
// const DB_NAME = process.env.DB_NAME
const DB_TEST = process.env.DB_TEST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
// After you create your Heroku application, visit https://dashboard.heroku.com/apps/ select the application name and add your Atlas connection string as a Config Var
// Node will look for this environment variable and if it exists, it will use it. Otherwise, it will assume that you are running this application locally
module.exports = {
  start: async() => {
    await mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://${DB_USER}:%24${DB_PASSWORD}%24@${DB_CLUSTER}.odgmd.mongodb.net/${DB_TEST}`, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
  });

// Use this to log mongo queries being executed!
 await connection.set('debug', true);
    return connection;
  }
}
