const farmerDB = require("../models/FarmerSchema");
const orderDB = require("../models/orderSchema");
const logisticsDB = require("../models/logisticsSchema");


// farmer registration controller BODY
const registerFarmer = async (req, res) => {
    try {
        const farmerRegistrationData = req.body;
        const farmerDoc = await farmerDB.create(farmerRegistrationData);
        res.status(200).send({ userId: farmerDoc._id, userType: "farmer" });
        // logging for debugging
        console.log("Farmer Registered : ", { userId: farmerDoc._id, userType: "farmer" });
    } catch (err) {
        res.status(400).send({ userId: null, userType: "farmer" });
        // logging for debugging
        console.error("FARMER REGISTER ERROR:", err.message);
    }
};

// farmer create produce controller BODY
const createProduce = async (req, res) => {
    try {
        const { farmer } = req.body;
        // finding farmer doc
        const farmerDoc = await farmerDB.findById(farmer.farmerId);
        // adding produce data
        farmerDoc.produceList.push(req.body);
        // saving the farmer doc
        await farmerDoc.save();
        res.status(200).send({ isCreated: true });
    } catch (err) {
        res.status(400).send({ isCreated: false });
        console.error("CREATE PRODUCE ERROR : ", err.message)
    }
};

// get farmer data controller BODY
const getFarmerData = async (req, res) => {
    try {
        const { farmerId } = req.body;
        const farmerDoc = await farmerDB.findById(farmerId);
        res.status(200).send(farmerDoc);
    } catch (err) {
        res.status(400).send({ error: true });
        console.error("GET FARMER DATA ERROR : ", err.message)
    }
};

// update farmer produce BODY
const updateProduce = async (req, res) => {
    try {
        const { farmer } = req.body;
        const { listingId } = req.body;
        const { quantity } = req.body;
        const { price } = req.body;
        const { minPrice } = req.body;
        const { maxPrice } = req.body;
        // updating farmer produce 
        const updatedDocRes = await farmerDB.updateOne(
            { _id: farmer.farmerId, 'produceList.listingId': listingId },
            {
                $set: {
                    'produceList.$.quantity': quantity,
                    'produceList.$.price': price,
                    'produceList.$.minPrice': minPrice,
                    'produceList.$.maxPrice': maxPrice,
                }
            });
        res.status(200).send({ isUpdated: updatedDocRes.acknowledged });
    } catch (err) {
        res.status(400).send({ isUpdated: false });
        console.error("PRODUCE UPDATE ERROR : ", err.message)
    }
};

// update farmer produce quantity BODY
const updateQuantity = async (req, res) => {
    try {
        const { farmerId } = req.body;
        const { listingId } = req.body;
        const { updatedQuantity } = req.body;
        // updating farmer produce quantity
        const updatedDoc = await farmerDB.updateOne(
            { _id: farmerId, 'produceList.listingId': listingId },
            { $set: { 'produceList.$.quantity': updatedQuantity, } });
        res.status(200).send({ isUpdated: updatedDoc.acknowledged });
    } catch (err) {
        res.status(400).send({ isUpdated: false });
        console.error("PRODUCE UPDATE QUANTITY ERROR: ", err.message)
    }
};

// get all orders of farmer QUERY
const getFarmerOrders = async (req,res)=> {
    try{
     const{farmerId} = req.query;
     const{status} = req.query;
     const farmerOrders = await orderDB.find({"farmer.farmerId":farmerId,orderStatus:status.toLowerCase()});
     res.status(200).send(farmerOrders);
    }catch(err){
     res.status(400).send({error:true});
     console.error("FAMER ORDERS ERROR: ",err.message);
    }
};

// get farmer logistics partner QUERY
const getLogisticsPartners = async (req, res) => {
    try {
        const { location } = req.query;
        const logisticsDocs = await logisticsDB.find({ district: location });
        res.status(200).send(logisticsDocs);
    } catch (err) {
        res.status(400).send({ error: true });
        console.error("GET LOGISTICS ERROR: ", err.message);
    }
};

// book logistics partner for farmer order BODY
const bookLogisticsPartner = async (req, res) => {
    try {
        const { orderId } = req.body;
        const { bookingStatus } = req.body;
        const { logistics } = req.body;
        const bookedOrderDoc = await orderDB.updateOne({ orderId: orderId },
            { $set: { bookingStatus: bookingStatus, logistics: logistics } });
        res.status(200).send({ isBooked: bookedOrderDoc.acknowledged });
    } catch (err) {
        res.status(400).send({ isBooked: false });
        console.error("LOGISTICS BOOKING ERROR: ", err.message)
    }
};

module.exports = {
    registerFarmer,
    createProduce,
    getFarmerData,
    updateProduce,
    updateQuantity,
    getFarmerOrders,
    getLogisticsPartners,
    bookLogisticsPartner,
}