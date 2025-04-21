const farmerDB = require("../models/FarmerSchema");

// checking registered user BODY
const checkRegisteredUser = async (req, res) => {
    try {
      if (req.body.type === "farmer") {
        const userData = await farmerDB.find({ email: req.body.email });
        // sending res to client if user email present
        userData.length ? res.status(200).send({ isRegistered: true }) : res.status(200).send({ isRegistered: false });
        res.end();
      } else if (req.body.type === "market") {
        const userData = await farmerDB.find({ email: req.body.email });
        // sending res to client if user email present
        userData.length ? res.status(200).send({ isRegistered: true }) : res.status(200).send({ isRegistered: false });
        res.end();
      } else {
        const userData = await farmerDB.find({ email: req.body.email });
        // sending res to client if user email present
        userData.length ? res.status(200).send({ isRegistered: true }) : res.status(200).send({ isRegistered: false });
        res.end();
      }
    } catch (err) {
      res.status(400).send({ error: err.message });
      console.log("checkUser ERROR:", err.message);
    }
  }

module.exports = {checkRegisteredUser}