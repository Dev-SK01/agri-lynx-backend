const OwnerDB = require("../models/OwnerSchema");
const farmerDB = require("../models/FarmerSchema");
const produceDB = require("../models/produceSchema");
const registerOwner = async (req, res) => {
    try {
        const ownerRegistrationData = req.body;
        const ownerDoc = await OwnerDB.create(ownerRegistrationData);
        res.status(200).send({ userId: ownerDoc._id, userType: "market" });
        console.log("Owner Registered : ", { userId: ownerDoc._id, userType: "market" });
    } catch (err) {
        res.status(400).send({ error:true });
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
            // district: ownerDistrict,
            purchasedList
        });

    } catch (err) {
        console.error("ERROR: ", err.message);
        res.status(500).json({ error: true, message: "Server error" });
    }
};







module.exports = {
    registerOwner,
    getPurchasedFromSameDistrict


};
