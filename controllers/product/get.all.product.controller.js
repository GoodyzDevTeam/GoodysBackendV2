const mongoose = require('mongoose');
const product = require('../../models/product/product').productModel;

exports.getAllProductsController = async (req, res) => {

  try {
    const results = await product.find({});
    return res.status(200).send(results);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}
