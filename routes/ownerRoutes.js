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

//owner Get ordered order
router.route("/ordered").post(ownerController.getOrderedOrder);

// Owner Get Delivered Orders
router.route("/delivered").post(ownerController.getDeliveredOrder);

// Owner Cancled Order
router.route("/cancelled").post(ownerController.getCanceledOrder);

router.route("/getownerdata").post(ownerController.getOwnerData);

// Owner Produce List Search
router.route("/search").post(ownerController.searchProduceList);

// Owner Orderd
router.route("/ordered").post(ownerController.ordered);

// Owner login
router.route("/login").post(ownerController.ownerLogin);

// cancel order 
router.route("/cancelorder").post(ownerController.cancelOrder);


module.exports = router;
