const express = require("express");
const router = express.Router();
const ownerController=require("../controllers/ownerController");


router.route("/").get(async (req, res) => {
    res.status(401).send({ message: "unauthorized" });
});

// Owner Registration
router.route("/register").post(ownerController.registerOwner);

// Owner ProdeuceList
router.route("/produce").post(ownerController.getPurchasedFromSameDistrict);

// Owner Place Order
router.route("/placeorder").post(ownerController.placeOrder);

// Owner Get Delivered Orders
router.route("/delivered").post(ownerController.getDeliveredOrder);

// Owner Cancled Order
router.route("/canceled").post(ownerController.getCanceledOrder);

module.exports = router;
