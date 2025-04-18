const farmerDB = require("../models/FarmerSchema");

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
}

module.exports = {registerFarmer}