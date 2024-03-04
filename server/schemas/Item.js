// server/schemas/Item.js
const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
 itemName: String,
 rarity: String,
 // 新增或确认其他相关字段
 wear: String,
 knife: String,
 finish: String,
});

module.exports = mongoose.model("Item", ItemSchema);