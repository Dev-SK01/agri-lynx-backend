const mongoose = require("mongoose")

const OwnerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    shopName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    alternateNumber: { type: String, required: true },
    address: { type: String, required: true },
    postOffice: { type: String, required: true },
    taluk: { type: String, required: true },
    district: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    
});


  

 module.exports = mongoose.model("OwnerSchema", OwnerSchema);
