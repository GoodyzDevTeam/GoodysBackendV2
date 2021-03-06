const mongoose = require('mongoose');
const favoriteDispensary = require('../../models/dispensary/favorite.dispensary').favoriteDispensaryModel;

exports.getFavoriteDispensariesController = async (req, res) => {

  try {
    const results = await favoriteDispensary.find({})
      .populate({ path: 'dispensary', model: 'dispensaries' });
    return res.status(200).send(results);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}
