const OwnerDB = require("../models/OwnerSchema");

const registerOwner = async (req, res) => {
    try {
        const ownerRegistrationData = req.body;
        const ownerDoc = await OwnerDB.create(ownerRegistrationData);
        res.status(200).send({ userId: ownerDoc._id, userType: "Owner" });
        console.log("Owner Registered : ", { userId: ownerDoc._id, userType: "owner" });
    } catch (err) {
        res.status(400).send({ userId: null, userType: "Owner" });
        console.log("OwnerRegister ERROR:", err.message);
    }
};

const getMarketOwnerProduceList = async (req, res) => {

    try {
        const { ownerId } = req.body;
        const ownerDoc = await OwnerDB.findById(ownerId);
        res.status(200).send(ownerDoc);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

module.exports = {
    registerOwner,
    getMarketOwnerProduceList,
};
