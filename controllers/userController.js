const farmerDB = require("../models/FarmerSchema");
const ownerDB = require("../models/OwnerSchema");
const logisticsDB = require("../models/logisticsSchema");
const otpDB = require("../models/otpSchema");
// checking registered user BODY
const checkRegisteredUser = async (req, res) => {
  const { type } = req.body;
  const { email } = req.body;
  try {
    if (type === "farmer") {
      const userData = await farmerDB.find({ email: email });
      // sending res to client if user email present
      userData.length ? res.status(200).send({ isRegistered: true }) : res.status(200).send({ isRegistered: false });
      res.end();
    } else if (type === "market") {
      const userData = await ownerDB.find({ email: email });
      // sending res to client if user email present
      userData.length ? res.status(200).send({ isRegistered: true }) : res.status(200).send({ isRegistered: false });
      res.end();
    } else {
      const userData = await logisticsDB.find({ email: email });
      // sending res to client if user email present
      userData.length ? res.status(200).send({ isRegistered: true }) : res.status(200).send({ isRegistered: false });
      res.end();
    }
  } catch (err) {
    res.status(400).send({ isRegistered: false });
    console.error("CHECK USER ERROR: ", err.message);
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, otp, type } = req.body;
    const otpRecord = await otpDB.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(401).send({ error: true, message: "Invalid otp or email " });
    }
    if (new Date() > otpRecord.expriresAt) {
      return res.status(401).send({ error: true, message: "OTP Has  Expired " });
    }
    // farmer login
    if (type === "farmer") {
      const farmerDoc = await farmerDB.findOne({ email });
      if (!farmerDoc) {
        return res.status(401).send({ error: true, message: "Farmer User Not Found " })
      }
      await otpDB.deleteOne({ email });
      return res.status(200).send({ userId: farmerDoc._id, userType: "farmer" });
    // owner login
    } else if (type === "market") {
      const ownerDoc = await ownerDB.findOne({ email });
      if (!ownerDoc) {
        return res.status(401).send({ error: true, message: "Owner User Not Found " })
      }
      await otpDB.deleteOne({ email });
      return res.status(200).send({ userId: ownerDoc._id, userType: "market" });
    // logistics login
    } else {
      const logisticDoc = await logisticsDB.findOne({ email });
      if (!logisticDoc) {
        return res.status(401).send({ error: true, message: "Logistics User Not Found " })
      }
      await otpDB.deleteOne({ email });
      return res.status(200).send({ userId: logisticDoc._id, userType: "logistic" });
    }
  } catch (err) {
    res.status(401).send({ error: true });
    console.error("farmerLogin ERROR :", err.message);
  }
}


module.exports = { checkRegisteredUser, loginUser };