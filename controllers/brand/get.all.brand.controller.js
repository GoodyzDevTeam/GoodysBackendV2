const mongoose = require('mongoose');
const brand = require('../../models/brand/brand').brandModel;

exports.getAllBrandsController = async (req, res) => {

  try {
    const results = await brand.find({});
    return res.status(200).send(results);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}
