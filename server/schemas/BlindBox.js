const mongoose = require("mongoose");

const BlindBoxlindBoxSchema = new mongoose.Schema({
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  });

  module.exports = mongoose.model("BlindBox", BlindBoxlindBoxSchema);