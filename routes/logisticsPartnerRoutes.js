const express = require("express");
const router = express.Router();
const logisticsPartnerController = require("../controllers/logisticsPartnerController");
const orderDB = require("../models/orderSchema");

//logisticsPartner Routes
router.route("/").get(async (req, res) => {
  res.status(401).send({ message: "unauthorized" });
});

//logisPartner register
router
  .route("/register")
  .post(logisticsPartnerController.logisticsPartnerRegistration);

// router.route("/order").post(async (req, res) => {
//   try {
//     let months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
//     const orderDoc = await orderDB.create(req.body);
//     // adding month prop
//     orderDoc.month = months[new Date().getMonth()];
//     // saving doc
//     await orderDoc.save();
//     res.status(200).send(orderDoc._id);
//   } catch (err) {
//     res.sendStatus(400);
//     console.error(err.message);
//   }
// });
module.exports = router;
 