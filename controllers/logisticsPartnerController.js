const logisticsPartnerDB = require("../models/logisticsSchema");

const logisticsPartnerRegistration = async (req, res) => {
  try {
    const logisticsPartnerRegistrationData = req.body;
    const logisticsPartnerDoc = await logisticsPartnerDB.create(logisticsPartnerRegistrationData);
    res.status(200).send({ userId: logisticsPartnerDoc._id, userType: "logistic" });
  } catch (err) {
    // logging for debugging
    res.status(400).send({error : true})
    console.error("LogisticsPartnerRegister ERROR:", err.message);
  }
};

module.exports = {logisticsPartnerRegistration} ;
