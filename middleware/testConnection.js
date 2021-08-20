const sequelize = require('../models').sequelize;

testConnection = async () => {
  try{
    await sequelize.authenticate()
    console.log('Connection test successful');
  }
  catch(err){
      console.log('Connection Failed:', err)
  }
}

module.exports = testConnection;