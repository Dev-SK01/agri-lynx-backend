const logistics = require("../models/logisticsSchema");
const otpDB = require("../models/otpSchema");
const orders= require("../models/orderSchema");
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
        res.status(400).json({ error: err.message , error:true});
    }
};

const logisticVerifyCustomer = async (req, res) => {
    try {
        const { email, otp, orderId } = req.body;

        const otpRecord = await otpDB.findOne({ email, otp });
        if (!otpRecord) {
            return res.status(404).json({ message: "Invalid OTP or email" });
        }

        if (new Date() > otpRecord.expiresAt) {
            return res.status(404).json({ message: "OTP has expired" });
        }

        const order = await orders.findOne({ orderId, "customer.email": email });
        if (!order) {
            return res.status(404).json({ message: "Order not found for this customer" });
        }

        order.orderStatus = "Delivered";
        await order.save();

        await otpDB.deleteOne({ email, otp });

        res.status(200).json({ message: "Order marked as delivered successfully", order });

    } catch (err) {
        res.status(404).json({ error: err.message, error: true });
    }
};


const updateBookingStatus = async (req, res) => {
    try {
        const { orderId, action } = req.query;

        if (!orderId || !action) {
            return res.status(400).json({ error: ' Missing orderId or action '});
        }

        const order = await orders.findOne({ orderId }); 

        if (!order) {
            return res.status(401).json({ error: 'Order not found'});
        }

        if (order.bookingStatus !== 'Pending') {
            return res.status(400).json({ error: ' Only pending bookings can be updated '});
        }

        if (action === 'accept') {
            order.bookingStatus = 'Accepted';
        } else if (action === 'cancel') {
            order.bookingStatus = 'Cancelled';
        } else {
            return res.status(400).json({ error: 'Invalid action'});
        }

        await order.save();

        return res.status(200).json({
            message: `Booking ${action}ed successfully`,
            error: false,
            bookingStatus: order.bookingStatus,
            orderId: order.orderId
        });

    } catch (err) {
        return res.status(500).json({ error: err.message, error: true });
    }
};




module.exports = {
    logisticLogin,
    logisticVerifyCustomer,
    updateBookingStatus
}