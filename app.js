'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const {models, sequelize} = require('./models')

// ----------middleware----------
// test connection to database
const testConnection = require('./middleware/testConnection');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// setup morgan 
app.use(morgan('dev'));
// Set json request parsing
app.use(express.json());


// greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome!',
  });
});

// -------------Routes-------------
// User routes
app.use('/api/users', require('./routes/users'));
// course routes
app.use('/api/courses', require('./routes/course'));


// ---------Error Handling---------
// send 404 
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
    Error: err.message,
  });
});

// set port
app.set('port', process.env.PORT || 5000);

// Test Database Connection
(async () => testConnection() )();

// start listening on port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
