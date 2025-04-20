const farmerDB = require("../models/FarmerSchema");
const orderDB = require("../models/orderSchema");

// farmer registration controller
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
        console.log("farmerRegister ERROR:", err.message);
    }
};

// farmer create produce controller
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
        console.log("CREATE PRODUCE ERROR : ", err.message)
    }
};

// get farmer data controller
const getFarmerData = async (req, res) => {
    try {
        const { farmerId } = req.body;
        const farmerDoc = await farmerDB.findById(farmerId);
        res.status(200).send(farmerDoc);
    } catch (err) {
        res.status(400).send({ error: true });
        console.log("GET FARMER DATA ERROR : ", err.message)
    }
};

// update farmer produce
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
        console.log("PRODUCE UPDATE ERROR : ", err.message)
    }
};

// update farmer produce quantity
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
        console.log("PRODUCE UPDATE QUANTITY ERROR: ", err.message)
    }
};

// get all orders of farmer
const getFarmerOrders = async (req,res)=> {
    try{
     const{farmerId} = req.query;
     const{status} = req.query;
     const farmerOrders = await orderDB.find({"farmer.farmerId":farmerId,orderStatus:status});
     res.status(200).send(farmerOrders);
    }catch(err){
     res.status(400).send({error:true});
     console.log("FAMER ORDERS ERROR: ",err.message);
    }
}

module.exports = {
    registerFarmer,
    createProduce,
    getFarmerData,
    updateProduce,
    updateQuantity,
    getFarmerOrders,
}