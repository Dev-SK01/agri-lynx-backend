const farmerDB = require("../models/FarmerSchema");

// checking registered user BODY
const checkRegisteredUser = async (req, res) => {
  const {type} = req.body;
  const{email} = req.body;
    try {
      if (type === "farmer") {
        const userData = await farmerDB.find({ email: email });
        // sending res to client if user email present
        userData.length ? res.status(200).send({ isRegistered: true }) : res.status(200).send({ isRegistered: false });
        res.end();
      } else if (type === "market") {
        const userData = await farmerDB.find({ email: email });
        // sending res to client if user email present
        userData.length ? res.status(200).send({ isRegistered: true }) : res.status(200).send({ isRegistered: false });
        res.end();
      } else {
        const userData = await farmerDB.find({ email: email });
        // sending res to client if user email present
        userData.length ? res.status(200).send({ isRegistered: true }) : res.status(200).send({ isRegistered: false });
        res.end();
      }
    } catch (err) {
      res.status(400).send({isRegistered: false});
      console.error("checkUser ERROR:", err.message);
    }
  }

module.exports = {checkRegisteredUser}