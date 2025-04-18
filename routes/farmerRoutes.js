const express = require("express")
const router = express.Router();
const farmerController = require("../controllers/farmerController")

// /farmer route
router.route("/").get(async (req, res) => {
    res.status(401).send({ message: "unauthorized" });
});

router.route("/register").post(farmerController.registerFarmer);

module.exports = router;