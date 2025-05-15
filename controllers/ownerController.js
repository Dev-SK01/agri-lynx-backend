const ownerDB = require("../models/OwnerSchema");
const farmerDB = require("../models/FarmerSchema");
const orderDB = require("../models/orderSchema");


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
            return res.status(401).json([]);
        }
        const purchasedList = matchingFarmers.flatMap(farmer => farmer.produceList || []);
        res.status(200).json({
            message: "Purchased list from matching district farmers",
            purchasedList
        });

    } catch (err) {
        console.error("ERROR: ", err.message);
        res.status(401).json({ error: true, message: "Server error" });
    }
};

// owner place order
const placeOrder = async (req, res) => {
    try {
        const  marketPlaceOrder  = req.body;
        const orderDoc = await orderDB.create(marketPlaceOrder);
        res.status(200).send({ ordered: true });
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
const getDeliveredOrder = async (req, res) =>{
    try {
        const {ownerId} = req.body
        const deliveredOrders = await orderDB.find({ "customer.customerId":ownerId,orderStatus:"delivered" });
        res.status(200).json(deliveredOrders);
    } catch (err) {
        res.status(401).json({ error: true});
    } 
}

// owner cancelled orders
const getCanceledOrder = async (req, res) =>{
    try {
        const {ownerId} = req.body;
        const cancelledOrders = await orderDB.find({ "customer.customerId":ownerId,orderStatus:"cancelled" });
        res.status(200).json(cancelledOrders);
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


module.exports = {
    registerOwner,
    getPurchasedFromSameDistrict,
    placeOrder,
    getOrderedOrder,
    getDeliveredOrder,
    getCanceledOrder,
    getOwnerData
};
