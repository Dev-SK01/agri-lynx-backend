const farmerDB = require("../models/FarmerSchema");

// farmer registration controller
const registerFarmer = async (req, res) => {
    try {
        const farmerRegistrationData = req.body;
        const farmerData = await farmerDB.create(farmerRegistrationData);
        res.status(200).send({ userId: farmerData._id, userType: "farmer" });
        // logging for debugging
        console.log("Farmer Registered : ", { userId: farmerData._id, userType: "farmer" });
    } catch (err) {
        res.status(400).send({ error: err.message });
        // logging for debugging
        console.log("farmerRegister ERROR:",err.message);
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
       res.status(400).send({error:true});
       console.log("GET FARMER DATA ERROR : ",err.message)
    }
};

module.exports = {registerFarmer,createProduce,getFarmerData}