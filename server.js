const connect = require("./config/connection").start();
const express = require('express');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

  app.listen(PORT, () => {
    console.log(`Api server listening on http://localhost:${PORT}`);
  });