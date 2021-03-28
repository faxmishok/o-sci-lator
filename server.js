const express = require('express');
const app = express();
const path = require('path');
const RouteConf = require('./src/config/RouteConf');

// Environment variables
require('dotenv').config();

// Deploying back-end
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Parse JSON in request body
app.use(express.json());

// Setting all routes
RouteConf(express, app);

// Serving front-end (static files)
app.use(express.static(path.join(__dirname, 'public')));

// Set 404 page
app.get('*', function (req, res) {
  res.status(404).redirect('404.html');
});

// Handling undhandled promise errors
process.on('unhandledRejection', (err) => {
  console.log(`Unhandled Error: ${err}`);
  process.exit(1);
});
