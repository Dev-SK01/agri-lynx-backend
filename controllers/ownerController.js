const ownerDB = require("../models/OwnerSchema");
const farmerDB = require("../models/FarmerSchema");
const orderDB = require("../models/orderSchema");
const otpDB = require("../models/otpSchema");


// owner registration
const registerOwner = async (req, res) => {
    try {
        const ownerRegistrationData = req.body;
        const ownerDoc = await ownerDB.create(ownerRegistrationData);
        res.status(200).send({ userId: ownerDoc._id, userType: "market" });
        console.log("Owner Registered : ", { userId: ownerDoc._id, userType: "market" });
    } catch (err) {
        res.status(401).send({ error: true });
        console.log("OwnerRegister ERROR:", err.message);
    }
};

// owner produce list
const getPurchasedFromSameDistrict = async (req, res) => {
    try {
        const { district } = req.body;
        const matchingFarmers = await farmerDB.find({ district: district });

        if (matchingFarmers.length === 0) {
            return res.status(200).json([]);
        }
        const purchasedList = matchingFarmers.flatMap(farmer => farmer.produceList || []);
        res.status(200).json({
            message: "Purchased list from matching district farmers",
            purchasedList
        });

    } catch (err) {
        console.error("GET PRODUCE LIST DISTRICT ERROR: ", err.message);
        res.status(401).json({ error: true, message: "Server error" });
    }
};

// owner place order
const placeOrder = async (req, res) => {
    try {
        const marketPlaceOrder = req.body;
        const orderDoc = await orderDB.create(marketPlaceOrder);
        res.status(200).send({ ordered: true });
        console.log("Order Placed : ", { ordered: true, orderId: orderDoc._id });
    } catch (err) {
        res.status(400).send({ ordered: false });
        console.error("CREATE PRODUCE ERROR : ", err.message)
    }
};

const getOrderedOrder = async (req, res) =>{
    try {
        const {ownerId} = req.body
        const orderedOrders = await orderDB.find({ "customer.customerId":ownerId,orderStatus:"ordered" });
        res.status(200).json(orderedOrders);
    } catch (err) {
        res.status(401).json({ error: true});
    } 
}
// owner delivered orders
const getDeliveredOrder = async (req, res) => {
    try {
        const {ownerId} = req.body
        const deliveredOrders = await orderDB.find({ "customer.customerId":ownerId,orderStatus:"delivered" });
        res.status(200).json(deliveredOrders);
    } catch (err) {
        res.status(401).json({ error: true });
    }
}

// owner cancelled orders
const getCanceledOrder = async (req, res) => {
    try {
        const { ownerId } = req.body;
        const cancelledOrders = await orderDB.find({ "customer.customerId": ownerId, orderStatus: "cancelled" });
        res.status(200).json(cancelledOrders);
    } catch (err) {
        res.status(401).json({ error: true });
    }
}

//owner produce list search
const searchProduceList = async (req, res) => {
    try {
        const { searchTerm } = req.body;

        const matchingFarmers = await farmerDB.find({
            produceList: {
                $elemMatch: {
                    commodity: { $regex: searchTerm, $options: "i" }
                }
            }
        });

        if (matchingFarmers.length === 0) {
            return res.status(404).json({ message: "No matching produce found." });
        }

        const filteredProduce = matchingFarmers.flatMap(farmer =>
            farmer.produceList.filter(p =>
                p.commodity.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

        res.status(200).json({
            message: "Matching produce found",
            purchasedList: filteredProduce
        });

    } catch (err) {
        console.error("searchProduceList ERROR: ", err.message);
        res.status(500).json({ error: true, message: "Server error" });
    }
}

// owner ordered
const ordered = async (req, res) => {
    try {
        const { ownerId } = req.body
        const orderd = await orderDB.find({ "customer.customerId": ownerId, orderStatus: "orderd" });
        res.status(200).json(orderd);
    } catch (err) {
        res.status(401).json({ error: true });
    }
}


// owner get data
 const getOwnerData = async (req, res) => {
   try {
     const { ownerId } = req.body;
     const ownerDoc = await  ownerDB.findById(ownerId);
     res.status(200).send(ownerDoc);
   } catch (err) {
     res.status(400).send({ error: true });
     console.error("GET owner DATA ERROR : ", err.message);
   }
 };

// owner login
const ownerLogin = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const otpRecord = await otpDB.findOne({ email, otp });
        if (!otpRecord) {
            return res.status(401).json({ error: true, message: "Invalid OTP or email" });
        }
        if (new Date() > otpRecord.expiresAt) {
            return res.status(401).json({ error: true, message: "OTP has expired" });
        }
        const ownerDoc = await OwnerDB.findOne({ email });

        if (!ownerDoc) {
            return res.status(401).json({ message: "Owner user not found" });
        }
        await otpDB.deleteOne({ email });
        res.status(200).send({ userId: ownerDoc._id, userType: "Owner" });
    } catch (err) {
        res.status(401).json({ error: err.message});
    }
};

// owner cancel order

const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const orderDoc = await orderDB.findOne({orderId: orderId});
        console.log("orderDoc", orderDoc);
        if (!orderDoc) {
            return res.status(404).json({ error: true, message: "Order not found" });
        }
        // setting order status to cancelled
        orderDoc.orderStatus = "cancelled";
        await orderDoc.save();
        res.status(200).json({ message: "Order cancelled successfully", isCancelled: true });
    } catch (err) {
        res.status(500).json({ isCancelled: false, message: err.message });
    }
}

// get all produce list
const getAllProduceList = async (req, res) => {
    try {
        const matchingFarmers = await farmerDB.find();
        if (matchingFarmers.length === 0) {
            return res.status(200).json([]);
        }
        const purchasedList = matchingFarmers.flatMap(farmer => farmer.produceList || []);
        res.status(200).json({
            message: "Purchased list from matching district farmers",
            purchasedList
        });

    } catch (err) {
        console.error("GET ALL PRUDUCE LIST ERROR: ", err.message);
        res.status(401).json({ error: true, message: "Server error" });
    }
}
module.exports = {
    registerOwner,
    getPurchasedFromSameDistrict,
    placeOrder,
    getOrderedOrder,
    getDeliveredOrder,
    getCanceledOrder,
    getOwnerData,
    searchProduceList,
    ordered,
    ownerLogin,
    cancelOrder,
    getAllProduceList,
};
