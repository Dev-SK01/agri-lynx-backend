const mongoose = require("mongoose");


const produceListSchema = new mongoose.Schema({
  listingId: { type: String, required: true },
  commodity: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  orderDate: { type: Date, required: true },
  orderStatus: { type: String, required: true },
  bookingStatus: { type: String, required: true },
  district: { type: String, required: true },
  farmerId: { type: String, required: true },
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
    upiId: { type: String, required: true }
  }
});

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
    produceList: [produceListSchema]
});


  

 module.exports = mongoose.model("OwnerSchema", OwnerSchema);
