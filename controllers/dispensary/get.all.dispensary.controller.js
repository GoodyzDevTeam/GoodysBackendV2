
const mongoose = require('mongoose');
const dispensary = require('../../models/dispensary/dispensary').dispensaryModel;

exports.getAllDispensariesController = async (req, res) => {

  try {
    const results = await dispensary.find({});
    return res.status(200).send(results);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}
