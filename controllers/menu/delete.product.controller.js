const mongoose = require('mongoose');
const merchantModel = require('../../models/merchant/merchant').merchantModel;
const productModel = require('../../models/product/product').productModel;
const { deleteProductPhoto } = require('../../application/photo/delete.product.photo');

exports.deleteProductController = async (req, res) => {

	const userId = req.userId;
	const mid = req.params.mid;

  try {
    const curMerchant = await merchantModel.findOne({_id: userId});

    let preProducts = curMerchant.menu ? curMerchant.menu.products : [];

		preProducts = preProducts ? preProducts.filter(product => product.mid != mid) : [];

		const deletingProduct = await productModel.findOne({ mid: mid});
		await deleteProductPhoto(deletingProduct.photos);

		await productModel.deleteOne({ mid: mid});

    await merchantModel.updateOne({_id: userId}, { menu: { products: preProducts } });

    return res.status(200).send({ menu: { products: preProducts }});
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}
