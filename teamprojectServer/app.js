const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();
const bodyparser = require("body-parser");
const port = process.env.port || 7000;

const userrouter = require('./routes/user.route');
const foodrouter = require('./routes/food.route')
const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
mongoose.connect(process.env.dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(data => {
    console.log("database connected");
}).catch(err => {
    console.log(err.message);
    process.exit(1);
})

app.use('/api/v1/user', userrouter);
app.use('/api/v2/food', foodrouter)

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`)
})