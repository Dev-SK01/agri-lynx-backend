const express = require("express");
const router = express.Router();
const Owner = require("../models/OwnerSchema");
const ownerController=require("../controllers/ownerController");
// Create new owner
router.route("/").get(async (req, res) => {
    res.status(401).send({ message: "unauthorized" });
});
router.route("/register").post(ownerController.registerOwner);
router.route("/producelist").get(ownerController.getMarketOwnerProduceList);
module.exports = router;
