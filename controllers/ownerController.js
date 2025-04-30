const OwnerDB = require("../models/OwnerSchema");
const farmerDB = require("../models/FarmerSchema");
const order = require("../models/orderSchema");
const registerOwner = async (req, res) => {
    try {
        const ownerRegistrationData = req.body;
        const ownerDoc = await OwnerDB.create(ownerRegistrationData);
        res.status(200).send({ userId: ownerDoc._id, userType: "market" });
        console.log("Owner Registered : ", { userId: ownerDoc._id, userType: "market" });
    } catch (err) {
        res.status(400).send({ error: true });
        console.log("OwnerRegister ERROR:", err.message);
    }
};



const getPurchasedFromSameDistrict = async (req, res) => {
    try {
        const { district } = req.body;
        const matchingFarmers = await farmerDB.find({ district: district });

        if (matchingFarmers.length === 0) {
            return res.status(404).json([]);
        }
        const purchasedList = matchingFarmers.flatMap(farmer => farmer.produceList || []);
        res.status(200).json({
            message: "Purchased list from matching district farmers",
            purchasedList
        });

    } catch (err) {
        console.error("ERROR: ", err.message);
        res.status(400).json({ error: true, message: "Server error" });
    }
};

const placdeOrder = async (req, res) => {
    try {
        const  marketPlaceOrder  = req.body;
        const orderDoc = await order.create(marketPlaceOrder);
        await orderDoc.save();
        res.status(200).send({ isCreated: true });
    } catch (err) {
        res.status(400).send({ isCreated: false });
        console.error("CREATE PRODUCE ERROR : ", err.message)
    }
};

const getDeliveredOrder = async (req, res) =>{
    try {
        const deliveredOrders = await order.find({ orderStatus:"Delivered" });
        res.status(200).json(deliveredOrders);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const getCanceledOrder = async (req, res) =>{
    try {
        const deliveredOrders = await order.find({ orderStatus:"Canceled" });
        res.status(200).json(deliveredOrders);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}






module.exports = {
    registerOwner,
    getPurchasedFromSameDistrict,
    placdeOrder,
    getDeliveredOrder,
    getCanceledOrder


};
