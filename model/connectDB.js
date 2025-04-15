const mongoose = require("mongoose");
const farmerSchema = require("./Farmer");

const connectDB = async () => {
    try{
       const connection = await mongoose.connect(process.env.DB_URL);
       const model = connection.model("farmer",farmerSchema);
       const data = await model.find();
       console.log(data);
       
    }catch(err){
        console.log(err.message);
    }
}

module.exports = connectDB;