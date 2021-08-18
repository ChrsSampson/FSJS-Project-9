const sequelize = require('../models').sequelize;

testConnection = (req, res, next) => {
  try{
    sequelize.authenticate()
    console.log('Connection test successful');
    next();
  }
  catch(err){
      console.log('Connection Failed:', err)
      next(err);
  }
}

module.exports = testConnection;