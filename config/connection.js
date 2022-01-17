const { connect, connection } = require('mongoose');
const createIfNotExistsDb = "socialDB";
// After you create your Heroku application, visit https://dashboard.heroku.com/apps/ select the application name and add your Atlas connection string as a Config Var
// Node will look for this environment variable and if it exists, it will use it. Otherwise, it will assume that you are running this application locally
module.exports = {
  start: async() => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/' + createIfNotExistsDb, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
  });

// Use this to log mongo queries being executed!
 await connection.set('debug', true);
    return connection;
  }
}
