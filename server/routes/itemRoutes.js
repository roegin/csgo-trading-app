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

module.exports = router;