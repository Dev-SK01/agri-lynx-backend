const mongoose = require("mongoose");

const clientOptions = { serverApi: 
    { version: '1', 
        strict: true, 
        deprecationErrors: true 
    } };

const connectDB = async () => {
    try{
       const connection = await mongoose.connect(process.env.CLOUD_DB,clientOptions);
       console.log("Database Conneted : ",connection.connections.length);
    }catch(err){
        console.error(err.message);
    }
}

module.exports = connectDB;