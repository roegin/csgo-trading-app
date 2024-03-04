// server/routes/boxRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth'); // 调整路径以匹配你的项目结构
const BlindBox = require('../schemas/BlindBox');
const User = require('../schemas/User'); // 调整路径以匹配你的项目结构

// server/routes/boxRoutes.js
router.post('/openbox',authMiddleware, async (req, res) => {
  try {
    // 假设所有盲盒都有统一格式存储在BlindBox模型中
    const blindBoxes = await BlindBox.find({});
    const randomIndex = Math.floor(Math.random() * blindBoxes.length);
    const selectedBox = blindBoxes[randomIndex];

    // 从选中的盲盒中随机抽取一个物品
    const items = selectedBox.items; // 假设items是存储item ObjectId的数组
    const selectedItemIndex = Math.floor(Math.random() * items.length);
    const selectedItem = items[selectedItemIndex];

    console.log('req.user',req.user)
    const userId = req.user.id; // 或其他方式获取当前用户ID

    // 更新用户物品列表
    await User.findByIdAndUpdate(userId, { $push: { items: selectedItem } });

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