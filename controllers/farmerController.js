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

// get analysis farmer order details
const getFarmerOrederAnalyticsHistory = async (req, res) => {
    let months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
  try {
    const { commodity, farmerId } = req.body;
    
    const farmerOrderAnalyticsDoc = {
    janorderdData : await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "ordered",month:"January"}),
    jandeliverdData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "deliverd",month:"January"}),
    jancelledData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "cancelled",month:"January"}),

    feborderdData :   await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "ordered",month:"February"}),
    febdeliverdData:  await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "deliverd",month:"February"}),
    febcancelledData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "cancelled",month:"February"}),

    marorderdData :   await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "ordered",month: "March"}),
    mardeliverdData:  await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "deliverd",month: "March"}),
    marcancelledData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "cancelled",month: "March"}),

    aprorderdData : await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "ordered",month:"April"}),
    aprdeliverdData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "deliverd",month:"April"}),
    aprcancelledData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "cancelled",month:"April"}),

    mayorderdData : await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "ordered",month:"May"}),
    maydeliverdData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "deliverd",month:"May"}),
    maycancelledData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "cancelled",month:"May"}),

    junorderdData : await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "ordered",month:"June"}),
    jundeliverdData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "deliverd",month:"June"}),
    juncancelledData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "cancelled",month:"June"}),

    julorderdData : await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "ordered",month:"July"}),
    juldeliverdData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "deliverd",month:"July"}),
    julcancelledData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "cancelled",month:"July"}),

    augorderdData : await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "ordered",month:"August"}),
    augdeliverdData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "deliverd",month:"August"}),
    augcancelledData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "cancelled",month:"August"}),

    seporderdData : await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "ordered",month:"September"}),
    sepdeliverdData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "deliverd",month:"September"}),
    sepcancelledData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "cancelled",month:"September"}),

    octorderdData : await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "ordered",month:"October"}),
    octdeliverdData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "deliverd",month:"October"}),
    octcancelledData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "cancelled",month:"October"}),

    novorderdData : await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "ordered",month:"November"}),
    novdeliverdData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "deliverd",month:"November"}),
    novcancelledData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "cancelled",month:"November"}),

    decorderdData : await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "ordered",month:"Decmber"}),
    decdeliverdData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "deliverd",month:"Decmber"}),
    deccancelledData: await orderDB.find({commodity: commodity,"farmer.farmerId": farmerId,orderStatus: "cancelled",month:"Decmber"}),

    
} 
    
    const AnalysisDetails = [
        {
        month: 'jan',
        ordered: farmerOrderAnalyticsDoc.janorderdData.length,
        delivered: farmerOrderAnalyticsDoc.jandeliverdData.length,
        cancelled: farmerOrderAnalyticsDoc.jancelledData.length,
      },
      {
        month: 'feb',
        ordered: farmerOrderAnalyticsDoc.feborderdData.length,
        delivered: farmerOrderAnalyticsDoc.febdeliverdData.length,
        cancelled: farmerOrderAnalyticsDoc.febcancelledData.length,
      },
      {
        month: 'mar',
        ordered: farmerOrderAnalyticsDoc.marorderdData.length,
        delivered: farmerOrderAnalyticsDoc.mardeliverdData.length,
        cancelled: farmerOrderAnalyticsDoc.marcancelledData.length,
      },
      {
        month: 'apr',
        ordered: farmerOrderAnalyticsDoc.aprorderdData.length,
        delivered: farmerOrderAnalyticsDoc.aprdeliverdData.length,
        cancelled: farmerOrderAnalyticsDoc.aprcancelledData.length,
      },
      {
        month: 'may',
        ordered: farmerOrderAnalyticsDoc.mayorderdData.length,
        delivered: farmerOrderAnalyticsDoc.maydeliverdData.length,
        cancelled: farmerOrderAnalyticsDoc.maycancelledData.length,
      },
      {
        month: 'june',
        ordered: farmerOrderAnalyticsDoc.junorderdData.length,
        delivered: farmerOrderAnalyticsDoc.jundeliverdData.length,
        cancelled: farmerOrderAnalyticsDoc.juncancelledData.length,
      },
      {
        month: 'jul',
        ordered: farmerOrderAnalyticsDoc.julorderdData.length,
        delivered: farmerOrderAnalyticsDoc.juldeliverdData.length,
        cancelled: farmerOrderAnalyticsDoc.julcancelledData.length,
      },
      {
        month: 'aug',
        ordered: farmerOrderAnalyticsDoc.augorderdData.length,
        delivered: farmerOrderAnalyticsDoc.augdeliverdData.length,
        cancelled: farmerOrderAnalyticsDoc.augcancelledData.length,
      },
      {
        month: 'sep',
        ordered: farmerOrderAnalyticsDoc.seporderdData.length,
        delivered: farmerOrderAnalyticsDoc.sepdeliverdData.length,
        cancelled: farmerOrderAnalyticsDoc.sepcancelledData.length,
      },
      {
        month: 'oct',
        ordered: farmerOrderAnalyticsDoc.octorderdData.length,
        delivered: farmerOrderAnalyticsDoc.octdeliverdData.length,
        cancelled: farmerOrderAnalyticsDoc.octcancelledData.length,
      },
      {
        month: 'nov',
        ordered: farmerOrderAnalyticsDoc.novorderdData.length,
        delivered: farmerOrderAnalyticsDoc.novdeliverdData.length,
        cancelled: farmerOrderAnalyticsDoc.novcancelledData.length,
      },
      {
        month: 'dec',
        ordered: farmerOrderAnalyticsDoc.decorderdData.length,
        delivered: farmerOrderAnalyticsDoc.decdeliverdData.length,
        cancelled: farmerOrderAnalyticsDoc.deccancelledData.length,
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
