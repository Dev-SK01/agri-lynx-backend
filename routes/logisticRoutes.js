const express = require("express");
const router = express.Router();
const logisticController = require("../controllers/logisticController");


router.route("/").get(async (req, res) => {
    res.status(401).send({ message: "unauthorized" });
});

// logistics partner registration
router.route("/register").post(logisticController.logisticsPartnerRegistration);

// logistics partner login
router.route("/login").post(logisticController.logisticLogin);

module.exports = router;