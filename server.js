const express = require('express');
const app = express();
const path = require('path');
const RouteConf = require('./src/config/RouteConf');

// Environment variables
require('dotenv').config();

// Deploying back-end
const port = 5000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Setting all routes
RouteConf(express, app);

// Serving front-end (static files)
app.use(express.static(path.join(__dirname, 'public')));

// Handling undhandled promise errors
process.on('unhandledRejection', (err) => {
  console.log(`Unhandled Error: ${err}`);
  process.exit(1);
});
