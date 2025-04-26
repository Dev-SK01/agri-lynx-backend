const express = require("express");
const router = express.Router();
const logisticController = require("../controllers/logisticController");
router.route("/").get(async (req, res) => {
    res.status(401).send({ message: "unauthorized" });
});

router.route("/login").get(logisticController.logisticLogin)

module.exports = router;