const express = require("express")
const router = express.Router();
const farmerController = require("../controllers/farmerController")
const farmerDB = require("../models/FarmerSchema");
const orderDB = require("../models/orderSchema");

// /farmer route
router.route("/").get(async (req, res) => {
    res.status(401).send({ message: "unauthorized" });
});
// register farmer
router.route("/register").post(farmerController.registerFarmer);

// create farmer produce
router.route("/createproduce").post(farmerController.createProduce);

// update farmer produce 
router.route("/updateproduce").post(farmerController.updateProduce);

// update quantity
router.route("/updatequantity").post(farmerController.updateQuantity);

// get farmerData
router.route("/getfarmerdata").get(farmerController.getFarmerData);

// get farmer  orders
router.route("/getfarmerorders").get(farmerController.getFarmerOrders);


module.exports = router;