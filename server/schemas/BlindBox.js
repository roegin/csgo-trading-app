const mongoose = require("mongoose");

const BlindBoxlindBoxSchema = new mongoose.Schema({
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    price: Number, // 添加价格字段
    type: String, // 新增类型字段
  });

  module.exports = mongoose.model("BlindBox", BlindBoxlindBoxSchema);