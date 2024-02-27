const express = require('express');
const cors = require('cors');
const user = require("./routes/userRoutes");
const trade = require("./routes/tradeRoutes");
const offer = require("./routes/offerRoutes");
const mongoose = require("mongoose");

const app = express();

// const MONGOURI = "mongodb://csgoAdmin:pswd123@localhost:27017/csgo_trading_app";
const MONGOURI = "mongodb+srv://roegin:tideland@alexmongodb.wfchfom.mongodb.net/buff";//"mongodb://db:27017/csgo_trading_app";



app.use(cors({
  origin: 'http://alex.shinestu.com:3000', // or '*' to allow all origins
  methods: ['GET', 'POST'], // allowed HTTP methods
  credentials: true // allow cookies to be sent with requests
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/users", user);
app.use("/trades", trade);
app.use("/offers", offer);

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


    