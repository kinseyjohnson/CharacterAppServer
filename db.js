const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.db)

module.exports = sequelize;


