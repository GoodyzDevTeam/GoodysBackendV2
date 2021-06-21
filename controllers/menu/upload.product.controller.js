const mongoose = require('mongoose');
const merchantModel = require('../../models/merchant/merchant').merchantModel;
const productModel = require('../../models/product/product').productModel;
const jwt = require('jsonwebtoken');
const { addProductPhoto } = require('../../application/photo/add.product.photo');

exports.uploadProductController = async (req, res) => {

	const Authorization  = req.rawHeaders[req.rawHeaders.indexOf('Authorization') + 1];

	if (!Authorization) {
		return res.status(401).send({ err: 'Authorization token missing'});
	}

	const accessToken = Authorization.split(' ')[1];

	if (!accessToken) return res.status(401).send({ err: 'Authorization missing'});
	const { userId } = jwt.verify(accessToken, process.env.JWT_SECRET);

  try {
    const curMerchant = await merchantModel.findOne({_id: userId});
		let request = JSON.parse(JSON.stringify(req.body));
		request.weightAndPrice = JSON.parse(req.body.weightAndPrice);
    const preProducts = curMerchant.menu ? curMerchant.menu.products : [];

		const photos = await addProductPhoto(req.files);
		console.log(photos);

		request.photos = photos;

		const newProduct = new productModel({
			_id: new mongoose.Types.ObjectId(),
			...request
		});
		await newProduct.save();

		preProducts.push(JSON.parse(JSON.stringify({
			...request
		})));
    
    await merchantModel.updateOne({_id: userId}, { menu: { products: preProducts } });

    return res.status(200).send({ menu: { products: preProducts }});
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}
