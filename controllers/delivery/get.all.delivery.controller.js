const mongoose = require('mongoose');
const delivery = require('../../models/delivery/delivery').deliveryModel;

exports.getAllDeliveriesController = async (req, res) => {

  try {
    const results = await delivery.find({});
    return res.status(200).send(results);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}
