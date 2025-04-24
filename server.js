const express = require("express");
const connectDB = require("./models/connectDB");
const farmerRoutes = require("./routes/farmerRoutes");
const otpController = require("./controllers/otpController");
const userController = require("./controllers/userController")
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const PORT = process.env.PORT || 3000;
const ownerRoutes = require ("./routes/ownerRoutes");
const ownerController =require ("./controllers/ownerController");

// connecting mongoDB
connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded());
const corsOption = { origin: ["http://localhost:8080"] };
app.use(cors(corsOption));
// helmet headers configs
app.use(helmet({xPoweredBy: true,}));

//  farmer routes 
app.use("/farmer", farmerRoutes);
app.use("/owner",ownerRoutes);

// app routes
app.get("/", (req, res) => {
  res.status(401).send("unauthorized");
});

app.get('/*splat', (req, res) => {
  res.status(401).send("unauthorized");
});

// route for checking registered user or not
app.post('/checkuser', userController.checkRegisteredUser);

// route for sending email
app.post("/sendotp", otpController.sendOtp);

// route for otp verification
app.post("/verifyotp", otpController.verifyOtp);


app.listen(PORT, (err) => {
  if (err) {
    console.error(err.message);

  } else {
    console.log(`Server listening on PORT : ${PORT} `);
  }
});

