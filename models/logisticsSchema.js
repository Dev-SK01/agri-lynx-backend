const mongoose = require("mongoose");

const logisticsSchema = new mongoose.Schema({
    name: {type:String,required:true},
    email: {type:String,required:true},
    phoneNumber: {type:String,required:true},
    alternateNumber:{type:String,required:true},
    address: {type:String,required:true},
    taluk: {type:String,required:true},
    district:{type:String,required:true},
    state: {type:String,required:true},
    pincode: {type:String,required:true},
    vehicleNumber:{type:String,required:true},
    vehicleType:{type:String,required:true},
    licenseNumber:{type:String,required:true}
});

module.exports = mongoose.model("logistics",logisticsSchema);