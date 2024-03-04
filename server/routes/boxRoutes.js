// server/routes/boxRoutes.js
const express = require('express');
const router = express.Router();

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

module.exports = router;