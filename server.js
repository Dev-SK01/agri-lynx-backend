const express = require("express");
const connectDB = require("./model/connectDB");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000 ;

// mongodb connection
connectDB();

app.get("/", (req,res)=>{
  res.send("Welcome");
});

app.listen(PORT,()=> {
    console.log(`Server listening on PORT : ${PORT} `);
});

