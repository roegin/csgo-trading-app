// server\schemas\Currency.js
const mongoose = require("mongoose");

const CurrencySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Currency", CurrencySchema);