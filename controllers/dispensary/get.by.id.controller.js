const mongoose = require('mongoose');
const dispensary = require('../../models/dispensary/dispensary').dispensaryModel;

exports.getByIdController = async (req, res) => {

  try {
    const results = await dispensary.findOne({ _id: req.params.dispensaryId })
      .populate({ path: 'products', model: 'products' });
    return res.status(200).send(results);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}
