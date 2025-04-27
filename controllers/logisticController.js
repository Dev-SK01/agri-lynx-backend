const logistics = require("../models/logisticsSchema");
const otpDB = require("../models/otpSchema");
const logisticLogin = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const otpRecord = await otpDB.findOne({ email, otp });

        if (!otpRecord) {
            return res.status(401).json({ message: "Invalid OTP or email" });
        }

        if (new Date() > otpRecord.expiresAt) {
            return res.status(401).json({ message: "OTP has expired" });
        }

        const logisticDoc = await logistics.findOne({ email });

        if (!logisticDoc) {
            return res.status(404).json({ message: "Logistic user not found" });
        }

        
        await otpDB.deleteOne({ email });

        res.status(200).send({userId: logisticDoc._id,userType: "logistic" });
    } catch (err) {
        res.status(500).json({ error: err.message , error:true});
    }
};


module.exports = {
    logisticLogin
}