const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email: String,
    otp: String,
    createdAt: { type: Date, expires: 60 * 5, default: Date.now }
});

module.exports = mongoose.model("otp",otpSchema);