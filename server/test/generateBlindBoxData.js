const axios = require('axios'); // 引入 axios
const  SERVER_URL  = 'http://alex.shinestu.com:4000'
// 生成随机物品数据并添加到服务器的函数，返回新物品的ID
async function addNewItem() {
    // 随机生成物品数据，取自 [snippet 5]
    const rarityTypes = ['普通', '稀有', '罕见', '传说'];
    const wearTypes = ['Factory New', 'Minimal Wear', 'Field-Tested', 'Well-Worn', 'Battle-Scarred'];
    const knifeTypes = ['Karambit', 'Bayonet', 'Flip Knife', 'Butterfly Knife'];
    const finishTypes = ['Crimson Web', 'Fade', 'Asiimov', 'Slaughter'];
  
    const itemData = {
      itemName: `${knifeTypes[Math.floor(Math.random() * knifeTypes.length)]} | ${finishTypes[Math.floor(Math.random() * finishTypes.length)]}`,
      rarity: rarityTypes[Math.floor(Math.random() * rarityTypes.length)],
      wear: wearTypes[Math.floor(Math.random() * wearTypes.length)],
      // 其他字段根据需要添加
    };
  
    // 调用添加物品的API
    const response = await axios.post(`${SERVER_URL}/api/items/add`, itemData);
    return response.data.item._id; // 假定响应体中返回了新创建的物品信息
  }

  // 为每个盲盒生成物品并构造盲盒数据的函数
async function generateBlindBoxData(index) {
    let itemIds = [];
    for (let i = 0; i < 3; i++) { // 假设每个盲盒包含3个物品
      const itemId = await addNewItem(); // 创建物品并获取ID
      itemIds.push(itemId);
    }
  
    return {
      id: index,
      items: itemIds, // 盲盒包含的物品ID数组
      // 可以添加更多盲盒属性
    };
  }

  module.exports = { generateBlindBoxData };