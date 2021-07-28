const Express = require('express');
const app = Express();
const dbConnection = require('./db')
require('dotenv').config()

dbConnection.authenticate()
.then(() => dbConnection.sync())
.then(() => {
    app.listen(3000, () => {
        console.log(`[Server]: App listening on 3000.`);
    });
})
.catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`)
})