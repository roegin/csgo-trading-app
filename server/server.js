const express = require('express');
const cors = require('cors');
const user = require("./routes/userRoutes");
const trade = require("./routes/tradeRoutes");
const offer = require("./routes/offerRoutes");
const currency = require("./routes/currencyRoutes"); // 新增
const mongoose = require("mongoose");

const app = express();

// const MONGOURI = "mongodb://csgoAdmin:pswd123@localhost:27017/csgo_trading_app";
const MONGOURI = "mongodb+srv://roegin:tideland@alexmongodb.wfchfom.mongodb.net/buff";//"mongodb://db:27017/csgo_trading_app";
// 具体添加此处







app.use(cors())

/*
app.get('/headers', (req, res) => {
    res.send(req.headers);
});
*/


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/users", user);
app.use("/trades", trade);
app.use("/offers", offer);
app.use("/currency", currency); // 新增

const User = require("./schemas/User");
const Trade = require("./schemas/Trade");
const Offer = require("./schemas/Offer");


const PORT = 4000;

mongoose.connect(MONGOURI)
    .then(() => {
        console.log("Connected to MDB");
        app.listen(PORT, () => {
            console.log(`Node is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });


console.log('服务器启动 1.1')
    