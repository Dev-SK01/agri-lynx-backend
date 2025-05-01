const mongoose = require("mongoose");

// farmer produce schema
const produceListSchema = new mongoose.Schema({
    commodity: { type: String, required: true },
    minPrice: { type: Number, required: true },
    maxPrice: { type: Number, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    listingId: { type: String, required: true },
    farmer: {
        farmerId: { type: String, required: true },
        name: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        address: { type: String, required: true },
        village: { type: String, required: true },
        postOffice: { type: String, required: true },
        taluk: { type: String, required: true },
        district: { type: String, required: true },
        pincode: { type: String, required: true },
        upiId: { type: String, required: true },
    },
});
// farmer data schema
const farmerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    alternateNumber: { type: String, required: true },
    address: { type: String, required: true },
    taluk: { type: String, required: true },
    district: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    ifscCode: { type: String, required: true },
    accountNumber: { type: String, required: true },
    accountHolderName: { type: String, required: true },
    bankName: { type: String, required: true },
    bankBranch: { type: String, required: true },
    upiId: { type: String, required: true },
    produceList: [produceListSchema]
});



module.exports = mongoose.model("Farmer", farmerSchema);