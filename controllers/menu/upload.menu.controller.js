const mongoose = require('mongoose');
const merchantModel = require('../../models/merchant/merchant').merchantModel;
const productModel = require('../../models/product/product').productModel;

exports.uploadMenuController = async (req, res) => {
	const userId = req.userId;
  try {
    const curMerchant = await merchantModel.findOne({_id: userId});
    console.log(curMerchant);
    const preProducts = curMerchant.menu ? curMerchant.menu.products : [];

    for (let product of preProducts) {
      await productModel.deleteOne({ mid: product.mid });
    }
    
    await merchantModel.updateOne({_id: userId}, { menu: req.body.menu });

    for ( let product of req.body.menu.products) {
      let newProductSchema = JSON.parse(JSON.stringify(product));
      console.log(newProductSchema);
      let newProduct = new productModel({
        _id: new mongoose.Types.ObjectId(),
        ...newProductSchema
      });
      await newProduct.save();
    }

    return res.status(200).send('OK');
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}
