// server/routes/boxRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth'); // 调整路径以匹配你的项目结构
const BlindBox = require('../schemas/BlindBox');
const User = require('../schemas/User'); // 调整路径以匹配你的项目结构
const Item = require("./schemas/Item");

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
    // server/routes/boxRoutes.js 中 openbox 接口的修改
    const selectedItem = await Item.findById(items[selectedItemIndex]).exec(); // 确保 Item 已经导入

    //console.log('req.user',req.user)
    const userId = req.user.id; // 或其他方式获取当前用户ID

    // 更新用户物品列表，将盲盒中的所有物品添加至用户
    await User.findByIdAndUpdate(
      userId, 
      { $push: { items: { $each: selectedBox.items } } }, // 使用 $each 将数组中的每个元素都添加到用户的 items 字段
      { new: true }
    ).exec();

    // 响应成功信息，可以选择返回给客户端更多信息（例如盲盒中包含的具体物品）
    res.json({ success: true, message: "盲盒开箱成功", items: selectedBox.items });
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