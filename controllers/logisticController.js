const logisticsDB = require("../models/logisticsSchema");
const otpDB = require("../models/otpSchema");


// logistics partner registration
const logisticsPartnerRegistration = async (req, res) => {
    try {
        const logisticsPartnerRegistrationData = req.body;
        const logisticsPartnerDoc = await logisticsPartnerDB.create(logisticsPartnerRegistrationData);
        res.status(200).send({ userId: logisticsPartnerDoc._id, userType: "logistic" });
    } catch (err) {
        // logging for debugging
        res.status(400).send({ error: true })
        console.error("LogisticsPartnerRegister ERROR:", err.message);
    }
};
// logistics partner login
const logisticLogin = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const otpRecord = await otpDB.findOne({ email, otp });
        if (!otpRecord) {
            return res.status(401).json({ error: true, message: "Invalid OTP or email" });
        }
        if (new Date() > otpRecord.expiresAt) {
            return res.status(401).json({ error: true, message: "OTP has expired" });
        }
        const logisticDoc = await logisticsDB.findOne({ email });

        if (!logisticDoc) {
            return res.status(404).json({ error: true, message: "Logistic user not found" });
        }
        await otpDB.deleteOne({ email });
        res.status(200).send({ userId: logisticDoc._id, userType: "logistic" });
    } catch (err) {
        res.status(400).json({ message: err.message, error: true });
    }
};


module.exports = {
    logisticsPartnerRegistration,
    logisticLogin,
}