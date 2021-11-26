const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const route = require("./routes");
const port = 8080;
const path = require('path');


app.use('/employees', route);


app.use('/public', express.static('public'));
app.use('/assets', express.static('assets'));

app.set('view engine', 'hbs');


app.listen(port, () => {
    console.log("server start on 8080")
})