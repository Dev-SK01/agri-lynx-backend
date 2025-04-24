const logisticsPartnerDB = require("../models/logisticsSchema");

const logisticsPartnerRegister = async (req, res) => {
  try {
    const logisticsPartnerRegistrationData = req.body;
    const logisticsPartnerDoc = await logisticsPartnerDB.create(logisticsPartnerRegistrationData);
    res.status(200).send({ userId: logisticsPartnerDoc._id, userType: "logistics" });
  } catch (err) {
    // logging for debugging
    res.status(400).send('Data not send ')
    console.log("LogisticsPartnerRegister ERROR:", err.message);
  }
};

module.exports = {logisticsPartnerRegister} ;
