require('dotenv').config()
const Express = require('express');
const app = Express();

const dbConnection = require('./db')
const controllers = require('./controllers')
const middleware = require('./middleware')


app.use(middleware.CORS)
// app.use(middleware.validateSession)


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


// app.listen(process.env.PORT, () => {
//     console.log(`[SERVER]: App is listening ${process.env.PORT}`)
// });