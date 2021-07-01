const mongoose = require('mongoose');
const product = require('../../models/product/product').productModel;
const favoriteProduct = require('../../models/product/favorite.product').favoriteProductModel;

exports.getFavoriteProductsController = async (req, res) => {
  const userId = req.userId;
  try {
    const results = await favoriteProduct.find({ user: userId })
      .populate({ path: 'product', model: 'products' });
    return res.status(200).send(results);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}
