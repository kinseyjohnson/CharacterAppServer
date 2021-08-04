// const Sequelize = require('sequelize');

<<<<<<< HEAD
=======


>>>>>>> 185c7a73d9b0fc39be6aba8e196da1a4f6508f89
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    ssl: process.env.ENVIRONMENT === 'development',
});

<<<<<<< HEAD
=======


// module.exports = sequelize;

const Sequelize = require("sequelize");

const sequelize = new Sequelize("postgres://postgres:hellokinsey@localhost:5432/workout-log-server");

>>>>>>> 185c7a73d9b0fc39be6aba8e196da1a4f6508f89
module.exports = sequelize;