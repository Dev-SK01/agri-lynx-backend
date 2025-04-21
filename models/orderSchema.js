const mongoose = require("mongoose");

// orders farmer data schema
const farmerSchema = new mongoose.Schema({
    farmerId: { type: String, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    taluk: { type: String, required: true },
    district: { type: String, required: true },
    pincode: { type: String, required: true },
    upiId: { type: String, required: true }
});
// orders market owner data schema
const customerSchema = new mongoose.Schema({
    customerId: { type: String, required: true },
    name:{ type: String, required: true },
    phoneNumber: { type: String, required: true },
    email:{ type: String, required: true },
    address: { type: String, required: true },
    taluk: { type: String, required: true },
    district: { type: String, required: true },
    pincode: { type: String, required: true },
});
// orders logistics partner data schema
const logisticsSchema = new mongoose.Schema({
        logisticsId:{ type: String, required: true },
        name: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
        taluk:{ type: String, required: true },
        district: { type: String, required: true },
        pincode: { type: String, required: true },
});
const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    listingId: { type: String, required: true },
    quantity: { type: String, required: true },
    price: { type: String, required: true },
    commodityPrice: { type: String, required: true },
    orderDate: {
        type: String, required: true, timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    },
    orderStatus: { type: String, required: true },
    bookingStatus: { type: String, required: true },
    commodity: { type: String, required: true },
    imageUrl: { type: String, required: true },
    farmer: farmerSchema,
    customer: customerSchema,
    logistics:logisticsSchema,
});

module.exports = mongoose.model("orders",orderSchema);