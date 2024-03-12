// 功能: 在 Express 服务器上启用 HTTPS 并提供 CRA 构建的静态文件
const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');

const app = express();

// 提供 CRA 构建的静态文件
const buildPath = 'D:\\alexRepo\\csgo-trading-app\\client\\build';
app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// HTTPS 选项
const httpsOptions = {
  key: fs.readFileSync('C:\\Certbot\\live\\bufftrader.com\\privkey.pem'),
  cert: fs.readFileSync('C:\\Certbot\\live\\bufftrader.com\\fullchain.pem')
};

// 创建 HTTPS 服务器
const server = https.createServer(httpsOptions, app);

const port = process.env.PORT || 443;
server.listen(port, () => {
  console.log('HTTPS server running on port ' + port);
});
