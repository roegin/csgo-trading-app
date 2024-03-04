const axios = require('axios'); // 引入 axios
const { SERVER_URL } = require('../config'); // 确保引入正确的配置
const { generateBlindBoxData } = require('./generateBlindBoxData');

// 生成随机盲盒数据的函数
function generateBlindBoxData(index) {
  const items = ['物品A', '物品B', '物品C']; // 假设这些是可能的道具名称
  const randomItemIndex = Math.floor(Math.random() * items.length);
  const itemName = items[randomItemIndex];

  // 返回构造的盲盒对象
  return {
    id: index,
    itemName: `${itemName} ${index}`, // 给每个盲盒一个唯一的名称
    rarity: '普通', // 假设默认稀有度为“普通”
    // 可以添加更多属性
  };
}

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