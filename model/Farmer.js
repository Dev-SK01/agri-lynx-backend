const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
    name:String,
});

module.exports = farmerSchema;
// module.exports = mongoose.model("Farmer",farmerSchema);