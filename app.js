const Express = require('express');
const app = Express();
require('dotenv').config()

app.listen(process.env.PORT, () => {
    console.log(`[SERVER]: App is listening ${process.env.PORT}`)
});