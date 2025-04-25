const express = require("express");
const router = express.Router();
const Owner = require("../models/OwnerSchema");
const ownerController=require("../controllers/ownerController");
// Create new owner
router.route("/").get(async (req, res) => {
    res.status(401).send({ message: "unauthorized" });
});

// Owner Registration
router.route("/register").post(ownerController.registerOwner);

// Owner ProdeuceList


router.route("/produce").post(ownerController.getPurchasedFromSameDistrict);
module.exports = router;
