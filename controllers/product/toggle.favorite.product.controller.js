const mongoose = require('mongoose');
const product = require('../../models/product/product').productModel;
const favoriteProduct = require('../../models/product/favorite.product').favoriteProductModel;

exports.toggleFavoriteProductsController = async (req, res) => {
  const userId = req.userId;
  const productId = req.body.productId;

  try {
    const stored = await favoriteProduct.find({ user: userId, product: productId });
    console.log(stored);
    if (!stored || stored.length == 0) {
      const newFP = new favoriteProduct({
        _id: new mongoose.Types.ObjectId(),
        user: userId,
        product: productId
      });
      await newFP.save();
    } else {
      await favoriteProduct.deleteMany({ user: userId, product: productId });
    }
    
    const results = await favoriteProduct.find({ user: userId })
      .populate({ path: 'product', model: 'products' });
    return res.status(200).send(results);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}
