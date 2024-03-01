const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdTrades: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trade"
    }],
    createdOffers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer"
    }],
        // 新增
    currency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Currency"
    }
});

module.exports = mongoose.model("User", UserSchema);