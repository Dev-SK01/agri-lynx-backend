const mongoose = require("mongoose");

const connectDB = async () => {
    try{
       const connection = await mongoose.connect(process.env.DB_URL);
       console.log(connection.connections.length)
    }catch(err){
        console.log(err.message);
    }
}

module.exports = connectDB;