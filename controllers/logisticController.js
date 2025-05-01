const logisticsDB = require("../models/logisticsSchema");
const otpDB = require("../models/otpSchema");
const orders= require("../models/orderSchema");



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
            return res.status(401).json({ message: "Logistic user not found" });
        }
        await otpDB.deleteOne({ email });
        res.status(200).send({ userId: logisticDoc._id, userType: "logistic" });
    } catch (err) {
        res.status(401).json({ error: err.message});
    }
};

const logisticVerifyCustomer = async (req, res) => {
    try {
        const { email, otp, orderId } = req.body;

        const otpRecord = await otpDB.findOne({ email, otp });
        if (!otpRecord) {
            return res.status(401).json({ message: "Invalid OTP or email" });
        }

        if (new Date() > otpRecord.expiresAt) {
            return res.status(401).json({ message: "OTP has expired" });
        }

        const order = await orders.findOne({ orderId, "customer.email": email });
        if (!order) {
            return res.status(401).json({ message: "Order not found for this customer" });
        }

        order.orderStatus = "delivered";
        await order.save();

        await otpDB.deleteOne({ email, otp });

        res.status(200).json({ message: "Order marked as delivered successfully", order });

    } catch (err) {
        res.status(401).json({ error: err.message, error: true });
    }
};


const updateBookingStatus = async (req, res) => {
    try {
        const { orderId, action } = req.query;

        if (!orderId || !action) {
            return res.status(401).json({ error: ' Missing orderId or action '});
        }

        const order = await orders.findOne({ orderId }); 

        if (!order) {
            return res.status(401).json({ error: 'Order not found'});
        }

        if (order.bookingStatus !== 'pending') {
            return res.status(401).json({ error: ' Only pending bookings can be updated '});
        }

        if (action === 'accept') {
            order.bookingStatus = 'accepted';
        } else if (action === 'cancel') {
            order.bookingStatus = 'cancelled';
        } else {
            return res.status(401).json({ error: 'Invalid action'});
        }

        await order.save();

        return res.status(200).json({
            message: `Booking ${action}ed successfully`,
            error: false,
            bookingStatus: order.bookingStatus,
            orderId:  order.orderId
        });

    } catch (err) {
        return res.status(401).json({ error: err.message, error: true });
    }
};




module.exports = {
    logisticLogin,
    logisticVerifyCustomer,
    updateBookingStatus
    logisticsPartnerRegistration,
}