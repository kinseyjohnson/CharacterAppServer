const Express = require('express');
const app = Express();
require('dotenv').config()

const controllers = require('./controllers')

const middleware = require('./middleware')

const dbConnection = require('./db')

app.use(Express.json())

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[SERVER] is running on ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(`[SERVER] crashed ${err}`)
    })

app.use('/user', controllers.userController)
app.use('/character', controllers.characterController)