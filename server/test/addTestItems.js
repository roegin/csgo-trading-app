const axios = require('axios'); // 引入 axios

const SERVER_URL = 'http://alex.shinestu.com:4000';

// 随机生成物品名称和稀有度
const generateRandomItem = (index) => {
    const rarityTypes = ['普通', '稀有', '罕见', '传说'];
    const wearTypes = ['Factory New', 'Minimal Wear', 'Field-Tested', 'Well-Worn', 'Battle-Scarred'];
    const knifeTypes = ['Karambit', 'Bayonet', 'Flip Knife', 'Butterfly Knife'];
    const finishTypes = ['Crimson Web', 'Fade', 'Asiimov', 'Slaughter'];
   
    const rarity = rarityTypes[Math.floor(Math.random() * rarityTypes.length)];
    const wear = wearTypes[Math.floor(Math.random() * wearTypes.length)];
    const knife = knifeTypes[Math.floor(Math.random() * knifeTypes.length)];
    const finish = finishTypes[Math.floor(Math.random() * finishTypes.length)];
   
    return { itemName: `物品${index}`, rarity, wear, knife, finish };
   };
// 创建100个随机示例物品
const sampleItems = Array.from({ length: 100 }, (_, index) => generateRandomItem(index + 1));

const addItemsToDatabase = async () => {
    try {
        const response = await axios.post(`${SERVER_URL}/api/items/add`, sampleItems);
        //console.log('sampleItems',sampleItems)
        console.log('添加成功:', response.data);
    } catch (error) {
        if (error.response) {
            // 请求已发出，服务器响应状态码不在 2xx 范围内
            console.error('添加失败:', error.response.data);
        } else if (error.request) {
            // 请求已发出但未收到响应
            console.error('服务器未响应:', error.request);
        } else {
            // 发送请求时出现了某些问题
            console.error('请求错误:', error.message);
        }
    }
};

addItemsToDatabase();

// Note: 这个脚本应该在 Node.js 环境中运行。确保你的环境中已经安装了 axios。
