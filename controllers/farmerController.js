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
    console.log("Farmer Registered : ", {
      userId: farmerDoc._id,
      userType: "farmer",
    });
  } catch (err) {
    res.status(400).send({ userId: null, userType: "farmer" });
    // logging for debugging
    console.log("farmerRegister ERROR:", err.message);
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
    console.error("CREATE PRODUCE ERROR : ", err.message);
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
    console.error("GET FARMER DATA ERROR : ", err.message);
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
      { _id: farmer.farmerId, "produceList.listingId": listingId },
      {
        $set: {
          "produceList.$.quantity": quantity,
          "produceList.$.price": price,
          "produceList.$.minPrice": minPrice,
          "produceList.$.maxPrice": maxPrice,
        },
      }
    );
    res.status(200).send({ isUpdated: updatedDocRes.acknowledged });
  } catch (err) {
    res.status(400).send({ isUpdated: false });
    console.error("PRODUCE UPDATE ERROR : ", err.message);
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
      { _id: farmerId, "produceList.listingId": listingId },
      { $set: { "produceList.$.quantity": updatedQuantity } }
    );
    res.status(200).send({ isUpdated: updatedDoc.acknowledged });
  } catch (err) {
    res.status(400).send({ isUpdated: false });
    console.error("PRODUCE UPDATE QUANTITY ERROR: ", err.message);
  }
};

// get all orders of farmer QUERY
const getFarmerOrders = async (req, res) => {
  try {
    const { farmerId } = req.query;
    const { status } = req.query;
    const farmerOrders = await orderDB.find({
      "farmer.farmerId": farmerId,
      orderStatus: status.toLowerCase(),
    });
    res.status(200).send(farmerOrders);
  } catch (err) {
    res.status(400).send({ error: true });
    console.error("FAMER ORDERS ERROR: ", err.message);
  }
};

// get analysis farmer order details BODY
const getFarmerOrederAnalyticsHistory = async (req, res) => {
  try {
    const { commodity, farmerId } = req.body;
    
    const farmerOrderAnalyticsDoc = {
    janOrderdData : await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "ordered",month:"January"}),
    janDeliverdData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "deliverd",month:"January"}),
    janCancelledData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "cancelled",month:"January"}),

    febOrderdData :   await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "ordered",month:"February"}),
    febDeliverdData:  await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "deliverd",month:"February"}),
    febCancelledData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "cancelled",month:"February"}),

    marOrderdData :   await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "ordered",month: "March"}),
    marDeliverdData:  await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "deliverd",month: "March"}),
    marCancelledData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "cancelled",month: "March"}),

    aprOrderdData : await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "ordered",month:"April"}),
    aprDeliverdData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "deliverd",month:"April"}),
    aprCancelledData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "cancelled",month:"April"}),

    mayOrderdData : await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "ordered",month:"May"}),
    mayDeliverdData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "deliverd",month:"May"}),
    mayCancelledData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "cancelled",month:"May"}),

    junOrderdData : await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "ordered",month:"June"}),
    junDeliverdData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "deliverd",month:"June"}),
    junCancelledData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "cancelled",month:"June"}),

    julOrderdData : await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "ordered",month:"July"}),
    julDeliverdData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "deliverd",month:"July"}),
    julCancelledData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "cancelled",month:"July"}),

    augOrderdData : await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "ordered",month:"August"}),
    augDeliverdData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "deliverd",month:"August"}),
    augCancelledData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "cancelled",month:"August"}),

    sepOrderdData : await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "ordered",month:"September"}),
    sepDeliverdData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "deliverd",month:"September"}),
    sepCancelledData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "cancelled",month:"September"}),

    octOrderdData : await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "ordered",month:"October"}),
    octDeliverdData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "deliverd",month:"October"}),
    octCancelledData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "cancelled",month:"October"}),

    novOrderdData : await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "ordered",month:"November"}),
    novDeliverdData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "deliverd",month:"November"}),
    novCancelledData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "cancelled",month:"November"}),

    decOrderdData : await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "ordered",month:"Decmber"}),
    decDeliverdData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "deliverd",month:"Decmber"}),
    decCancelledData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "cancelled",month:"Decmber"}),

    
} 
 
    
    const AnalysisDetails = [
        {
        month: 'jan',

        ordered: farmerOrderAnalyticsDoc.janOrderdData?.length || 0,
        delivered: farmerOrderAnalyticsDoc.janDeliverdData?.length || 0,
        cancelled: farmerOrderAnalyticsDoc.janCelledData?.length || 0,
      },
      {
        month: 'feb',
        ordered: farmerOrderAnalyticsDoc.febOrderdData?.length || 0,
        delivered: farmerOrderAnalyticsDoc.febDeliverdData?.length || 0,
        cancelled: farmerOrderAnalyticsDoc.febCancelledData?.length || 0,
      },
      {
        month: 'mar',
        ordered: farmerOrderAnalyticsDoc.marOrderdData?.length || 0,
        delivered: farmerOrderAnalyticsDoc.marDeliverdData?.length || 0,
        cancelled: farmerOrderAnalyticsDoc.marCancelledData?.length || 0,
      },
      {
        month: 'apr',
        ordered: farmerOrderAnalyticsDoc.aprOrderdData?.length || 0,
        delivered: farmerOrderAnalyticsDoc.aprDeliverdData?.length || 0,
        cancelled: farmerOrderAnalyticsDoc.aprCancelledData?.length || 0,
      },
      {
        month: 'may',
        ordered: farmerOrderAnalyticsDoc.mayOrderdData?.length || 0,
        delivered: farmerOrderAnalyticsDoc.mayDeliverdData?.length || 0,
        cancelled: farmerOrderAnalyticsDoc.mayCancelledData?.length || 0,
      },
      {
        month: 'june',
        ordered: farmerOrderAnalyticsDoc.junOrderdData?.length || 0,
        delivered: farmerOrderAnalyticsDoc.junDeliverdData?.length || 0,
        cancelled: farmerOrderAnalyticsDoc.junCancelledData?.length || 0,
      },
      {
        month: 'jul',
        ordered: farmerOrderAnalyticsDoc.julOrderdData?.length || 0,
        delivered: farmerOrderAnalyticsDoc.julDeliverdData?.length || 0,
        cancelled: farmerOrderAnalyticsDoc.julCancelledData?.length || 0,
      },
      {
        month: 'aug',
        ordered: farmerOrderAnalyticsDoc.augOrderdData?.length || 0,
        delivered: farmerOrderAnalyticsDoc.augDeliverdData?.length || 0,
        cancelled: farmerOrderAnalyticsDoc.augCancelledData?.length || 0,
      },
      {
        month: 'sep',
        ordered: farmerOrderAnalyticsDoc.sepOrderdData?.length || 0,
        delivered: farmerOrderAnalyticsDoc.sepDeliverdData?.length || 0,
        cancelled: farmerOrderAnalyticsDoc.sepCancelledData?.length || 0,
      },
      {
        month: 'oct',
        ordered: farmerOrderAnalyticsDoc.octOrderdData?.length || 0,
        delivered: farmerOrderAnalyticsDoc.octDeliverdData?.length || 0,
        cancelled: farmerOrderAnalyticsDoc.octCancelledData?.length || 0,
      },
      {
        month: 'nov',
        ordered: farmerOrderAnalyticsDoc.novorderdData?.length || 0,
        delivered: farmerOrderAnalyticsDoc.novDeliverdData?.length || 0,
        cancelled: farmerOrderAnalyticsDoc.novCancelledData?.length || 0,
      },
      {
        month: 'dec',
        ordered: farmerOrderAnalyticsDoc.decOrderdData?.length || 0,
        delivered: farmerOrderAnalyticsDoc.decDeliverdData?.length || 0,
        cancelled: farmerOrderAnalyticsDoc.decCancelledData?.length || 0,
      },
    ]
    
    res.status(200).send(AnalysisDetails);
  } catch (err) {
    res.status(400).send({ error: true });
    console.error("FARMER ORDER ANALYTICS ERROR :", err.message);
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
    const bookedOrderDoc = await orderDB.updateOne(
      { orderId: orderId },
      { $set: { bookingStatus: bookingStatus, logistics: logistics } }
    );
    res.status(200).send({ isBooked: bookedOrderDoc.acknowledged });
  } catch (err) {
    res.status(400).send({ isBooked: false });
    console.error("LOGISTICS BOOKING ERROR: ", err.message);
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
  getFarmerOrederAnalyticsHistory,
};
