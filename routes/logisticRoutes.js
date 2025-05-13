const express = require("express");
const router = express.Router();
const logisticController = require("../controllers/logisticController");


router.route("/").get(async (req, res) => {
    res.status(401).send({ message: "unauthorized" });
});

// verify Customer

router.route("/verifycustomer").post (logisticController.logisticVerifyCustomer);

// booking status
router.route("/updatebookingstatus").post (logisticController.updateBookingStatus);

// logistics partner registration
router.route("/register").post(logisticController.logisticsPartnerRegistration);

// logistics partner login
router.route("/login").post(logisticController.logisticLogin);

// logistic orderd
router.route("/ordered").post(logisticController.ordered);

// logistic partner details
router.route("/details").post(logisticController.getLogisticDetails);

// update logistic order status
router.route("/updatestatus").post(logisticController.updateLogisticOrderStatus);





module.exports = router;