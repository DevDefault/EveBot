const Sequelize = require('sequelize')
const database = require('../core/database')
 
const user = database.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        autoIncrement: false,
        allowNull: false,
        primaryKey: false
    },
    username: {
        type: Sequelize.STRING,
        autoIncrement: false,
        allowNull: false,
        primaryKey: false
    },
    password: {
        type: Sequelize.STRING,
        autoIncrement: false,
        allowNull: false,
        primaryKey: false
    }
})
 
module.exports = user