const mongoose = require('mongoose');
const product = require('../../models/product/product').productModel;

exports.getProductByIdController = async (req, res) => {

  try {
    const results = await product.findOne({ _id: req.params.productId });
    return res.status(200).send(results);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}
