const express = require("express");
const router = express.Router();
const logisticController = require("../controllers/logisticController");
router.route("/").get(async (req, res) => {
    res.status(401).send({ message: "unauthorized" });
});
// login
router.route("/login").get(logisticController.logisticLogin);

// verify Customer

router.route("/orderstatus").post (logisticController.logisticVerifyCustomer);

// booking status
router.route("/bookingstatus").post (logisticController.updateBookingStatus);

module.exports = router;