'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');

const sequelize = require('./models').sequelize;
const DB = require('./models/index');

// ----------middleware----------
// test connection to database
const testConnection = require('./middleware/testConnection');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));
// Set json request parsing
app.use(express.json());


// greeting for the root route
app.get('/', testConnection, (req, res) => {
  res.json({
    message: 'Welcome to project!',
  });
});

// -------------Routes-------------
// User routes
app.use('/users', require('./routes/users'));
// course routes
app.use('/courses', require('./routes/course'));


// ---------Error Handling---------
// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
