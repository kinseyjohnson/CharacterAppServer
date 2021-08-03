const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.db, {
    dialect: 'postgres',
    ssl: process.env.ENVIRONMENT === 'development',
});

module.exports = sequelize;