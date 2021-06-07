const mongoose = require('mongoose');
const deal = require('../../models/deal/deal').dealModel;

exports.getAllDealsController = async (req, res) => {

  try {
    const results = await deal.find({});
    return res.status(200).send(results);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}
