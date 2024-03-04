// server/routes/boxRoutes.js
const express = require('express');
const router = express.Router();
const BlindBox = require('../schemas/BlindBox');

router.post('/openbox', async (req, res) => {
    try {
      // 假设所有物品都存储在一个数组中
      const items = await Item.find({});
      const randomIndex = Math.floor(Math.random() * items.length);
      const selectedItem = items[randomIndex];
      res.json({ success: true, item: selectedItem });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "服务器错误" });
    }
  });

// 添加单个盲盒接口
router.post('/add', async (req, res) => {
  try {
    const blindBox = new BlindBox(req.body);
    await blindBox.save();
    res.status(201).json({ message: "盲盒添加成功", blindBox });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "服务器错误" });
  }
});

// 批量添加盲盒接口
router.post('/batchAdd', async (req, res) => {
  try {
    const blindBoxes = req.body; // 预期是一个盲盒数组
    const result = await BlindBox.insertMany(blindBoxes);
    res.status(201).json({ message: "批量添加盲盒成功", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "服务器错误" });
  }
});



module.exports = router;