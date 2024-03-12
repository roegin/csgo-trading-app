const express = require('express');
const cors = require('cors');
const user = require("./routes/userRoutes");
const trade = require("./routes/tradeRoutes");
const offer = require("./routes/offerRoutes");
const currency = require("./routes/currencyRoutes"); // 新增
const boxRoutes = require('./routes/boxRoutes');
const itemRoutes = require('./routes/itemRoutes'); 
const mongoose = require("mongoose");
const fs = require('fs');
const https = require('https');

const app = express();
app.use(cors())

// const MONGOURI = "mongodb://csgoAdmin:pswd123@localhost:27017/csgo_trading_app";
const MONGOURI = "mongodb+srv://roegin:tideland@alexmongodb.wfchfom.mongodb.net/buff";//"mongodb://db:27017/csgo_trading_app";
// 具体添加此处



const httpsOptions = {
    key: fs.readFileSync('C:\\Certbot\\live\\bufftrader.com\\privkey.pem'),
    cert: fs.readFileSync('C:\\Certbot\\live\\bufftrader.com\\fullchain.pem')
   };

   // 创建 HTTPS 服务器
//const httpsServer = https.createServer(httpsOptions, app);



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
app.use('/api/boxes', boxRoutes); // 使用/api作为基础路径
app.use('/api/items', itemRoutes);

const User = require("./schemas/User");
const Trade = require("./schemas/Trade");
const Offer = require("./schemas/Offer");
const Item = require("./schemas/Item");
const BlindBox = require("./schemas/BlindBox");


const PORT = 4000;

mongoose.connect(MONGOURI)
  .then(() => {
    console.log("Connected to MongoDB");
    // 创建 HTTPS 服务器实例并监听
    const httpsServer = https.createServer(httpsOptions, app);
    //const PORT = process.env.PORT || 443;
    httpsServer.listen(PORT, () => {
      console.log(`HTTPS server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });


console.log('服务器启动 3.')
    