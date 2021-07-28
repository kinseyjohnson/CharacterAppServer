const Express = require('express');
const app = Express();
require('dotenv').config();

// app.use("/test", (req, res) => {
//   res.send("This is a message from the test endpoint on the server!");
// });   

const controllers = require("./controllers");

const dbConnection = require('./db')

app.use(Express.json())

app.listen(process.env.PORT, () => {
    console.log(`[SERVER]: App is listening ${process.env.PORT}`)
});

app.use('/user', controllers.userController)