const axios = require('axios'); // 引入 axios
const  SERVER_URL  = 'http://alex.shinestu.com:4000'
const { generateBlindBoxData } = require('./generateBlindBoxData');



// 向服务器批量添加盲盒的函数
async function addBlindBoxesToServer() {
    let blindBoxes = [];
    for (let i = 0; i < 100; i++) {
      const blindBoxData = await generateBlindBoxData(i + 1); // 异步获取盲盒数据
      blindBoxes.push(blindBoxData);
    }
  
    try {
      const response = await axios.post(`${SERVER_URL}/api/boxes/batchAdd`, blindBoxes);
      console.log('批量添加盲盒成功', response.data);
    } catch (error) {
      console.error('批量添加盲盒失败:', error.message);
    }
  }

addBlindBoxesToServer();