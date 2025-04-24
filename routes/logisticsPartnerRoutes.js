const express = require("express")
const router = express.Router();
const logisticsPartnerController = require('../controllers/logisticsPartnerController')


//logisticsPartner Routes 
router.route("/").get(async (req, res) => {  
    res.status(401).send({ message: "unauthorized" });
});

//logisPartner register
router.route("/registeration").post(logisticsPartnerController.logisticsPartnerRegister)

module.exports = router;
