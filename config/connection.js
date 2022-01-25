const { connect, connection } = require('mongoose');

require('dotenv').config();

const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/socialDB';

connect(connectionString, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports = connection;