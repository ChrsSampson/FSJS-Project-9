'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class User extends Sequelize.Model {}
    User.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              notNull:{
                args:true,
                msg: "First Name is Required"
              }
            }
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              notNull:{
                args:true,
                msg: "Last Name is Required"
              }
            }
        },
        emailAddress: {
            type: Sequelize.STRING,
            validate: {
                isEmail: {
                    args: true,
                    msg: "Provide a properly formatted email address"
                }
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              notNull:{
                args:true,
                msg: "A valid password is required"
              }
            }
        }
    }, { sequelize });
    
    //data association 
    User.associate = (models) => {
        User.hasMany(models.Course, {
            foreignKey: {
                fieldName: "userId"
            }
        })
    };

    return User;
};