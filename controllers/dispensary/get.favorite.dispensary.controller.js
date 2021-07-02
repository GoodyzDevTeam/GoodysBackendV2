const mongoose = require('mongoose');
const favoriteDispensary = require('../../models/dispensary/dispensary').favoriteDispensaryModel;

exports.getFavoriteDispensariesController = async (req, res) => {

  try {
    const results = await favoriteDispensary.find({});
    return res.status(200).send(results);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}
