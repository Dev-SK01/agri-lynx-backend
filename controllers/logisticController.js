const logisticsDB = require("../models/logisticsSchema");
const otpDB = require("../models/otpSchema");
const orderDB= require("../models/orderSchema");


// logistics partner registration
const logisticsPartnerRegistration = async (req, res) => {
    try {
        const logisticsPartnerRegistrationData = req.body;
        const logisticsPartnerDoc = await logisticsDB.create(logisticsPartnerRegistrationData);
        res.status(200).send({ userId: logisticsPartnerDoc._id, userType: "logistic" });
    } catch (err) {
        // logging for debugging
        res.status(400).send({ error: true })
        console.error("Logistics Partner Register ERROR:", err.message);
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
            return res.status(401).json({ message: "Invalid OTP or email",error:true});
        }
        // Check if the OTP has expired
        if (new Date() > otpRecord.expiresAt) {
            return res.status(401).json({ message: "OTP has expired",error:true});
        }

        const order = await orderDB.findOne({ orderId, "customer.email": email });
        if (!order) {
            return res.status(401).json({ message: "Order not found for this customer",error:true});
        }

        order.orderStatus = "delivered";
        
        await order.save();

        await otpDB.deleteOne({ email, otp });

        res.status(200).json({isVerified: true, message: "Customer verified successfully"});

    } catch (err) {
        res.status(401).json({ error: err.message, error: true });
    }
};


const updateBookingStatus = async (req, res) => {
    try {
        const { orderId, action } = req.body;

        if (!orderId || !action) {
            return res.status(401).json({ error: ' Missing orderId or action '});
        }

        const order = await orderDB.findOne({ orderId }); 

        if (!order) {
            return res.status(401).json({ message: 'Order not found',error:true});
        }

        if (order.bookingStatus !== 'pending') {
            return res.status(401).json({ message: ' Only pending bookings can be updated',errror:true});
        }
        if (action === 'accept') {
            order.bookingStatus = 'accepted';
        } else if (action === 'cancel') {
            order.bookingStatus = 'cancelled';
        } else {
            return res.status(401).json({ error: true});
        }

        await order.save();

        return res.status(200).json({
            message: `Booking ${action}ed successfully`,
            error: false,
            bookingStatus: order.bookingStatus,
            orderId:  order.orderId
        });

    } catch (err) {
        return res.status(401).json({ message: err.message, error: true });
    }
  };
  

const getLogisticData = async (req, res) => {
  try {
    const { logisticId } = req.body;
    const logisticDoc = await  logisticsDB.findById(logisticId);
    res.status(200).send(logisticDoc);
  } catch (err) {
    res.status(400).send({ error: true });
    console.error("GET LOGISTIC DATA ERROR : ", err.message);
  }
};

//logistic partner ordered
const getLogisticsOrders = async (req, res) => {
    try {
        const { logisticsId , status} = req.body;
        if(status === "booked"){
            const logisticOrderDoc = await orderDB.find({ "logistics.logisticsId": logisticsId, bookingStatus: status });
            return res.status(200).json(logisticOrderDoc);
        }else{
            const logisticOrderDoc = await orderDB.find({ "logistics.logistics": logisticsId, orderStatus: status });
            return res.status(200).json(logisticOrderDoc);
        }
    } catch (err) {
        console.log("LOGISTICS ORDERS ERROR : " ,err.message);
        res.status(401).json({ error: true });
    }
}

//logistic partner details
const getLogisticDetails = async (req, res) => {
    try {
        const { logisticsId } = req.body
        const logisticDetails = await logisticsDB.findById(logisticsId);
        res.status(200).json(logisticDetails);
    }
    catch (err) {
        res.status(401).json({ error: true });
        console.error("GET LOGISTIC DETAILS ERROR : ", err.message);
    }
};    

//update logistic order status
const updateLogisticOrderStatus = async (req , res ) => {
  try{const { email, otp, orderId,status} = req.body;

  const otpRecord = await otpDB.findOne({ email, otp });
  if (!otpRecord) {
      return res.status(401).json({ message: "Invalid OTP or email",error:true});
  }
  
  if (new Date() > otpRecord.expiresAt) {
      return res.status(401).json({ message: "OTP has expired",error:true});
  }
    
    const orderDoc = await orderDB.updateOne(
      { orderId: orderId },
      { $set: { orderStatus: status } }
    );
    res.status(200).send({isUpdated:orderDoc.acknowledged});
  }catch(err){
    res.status(401).send({error : true});
    console.error("UPDATE LOGISTIC ORDER STATUS ERROR ", err.message ); 
  }
 

}


module.exports = {
    logisticLogin,
    logisticVerifyCustomer,
    updateBookingStatus,
    logisticsPartnerRegistration,
    getLogisticData,
    getLogisticsOrders,
    getLogisticDetails,
    updateLogisticOrderStatus,
}
