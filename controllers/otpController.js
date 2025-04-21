const otpDB = require("../models/otpSchema");
const otpGenerator = require("otp-generator");
const emailTransporter = require('../utils/sendEmail');
const emailTemplate = require("../utils/emailTemplate");

// send email otp BODY
const sendOtp = (req, res) => {
    try {
        const { email } = req.body;
        // generating otp
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        // email options
        const mailOptions = {
            from: "agrilynxteam@gmail.com",
            to: email,
            subject: "AGRI LYNX OTP",
            html: emailTemplate(otp)
        };
        // sending email
        emailTransporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                res.status(500).send({ error: "faild to send email" });
                console.error("Error sending email: ", error);
            } else {
                // saving data in DB
                const otpData = await otpDB.create({ email, otp });
                res.status(200).send({ data: { otpData }, isnfo: info.response, message: "Email Sent" });
            }
        });
    } catch (err) {
        res.status(400).send({ message: "Error in Server" });
        console.log("OTP SEND ERROR : ", err.message);
    }
}

// verify otp QUERY
const verifyOtp = async (req, res) => {
    try {
        const { otp } = req.query;
        // finding otp
        const otpData = await otpDB.find({ otp: otp });
        // sending response 
        otpData.length ? res.status(200).send({ verified: true }) : res.status(200).send({ verified: false });
    } catch (err) {
        res.status(500).send({ error: "internal server error" });
        console.log("VERIFY OTP ERROR :", err.message)
    }
}

module.exports = {sendOtp, verifyOtp}