// server/routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const Item = require('../schemas/Item'); // 确保路径正确

// 添加物品的API
router.post('/add', async (req, res) => {
  try {
    const { itemName, rarity, wear, knife, finish } = req.body;
    //console.log('测试-添加物品',req.body)
    const newItem = new Item({ itemName, rarity, wear, knife, finish });
    await newItem.save();
    res.json({ success: true, item: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "服务器错误" });
  }
});

// 批量添加物品的路由
router.post('/batchAdd', async (req, res) => {
  try {
    const items = req.body; // 假设前端发送的是一个物品数组
    // 使用 mongoose 的 insertMany 方法批量插入数据
    await Item.insertMany(items);
    res.status(200).json({ success: true, message: "批量添加成功" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "服务器错误" });
  }
});

module.exports = router;