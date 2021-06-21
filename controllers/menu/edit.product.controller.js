const mongoose = require('mongoose');
const merchantModel = require('../../models/merchant/merchant').merchantModel;
const productModel = require('../../models/product/product').productModel;
const jwt = require('jsonwebtoken');
const { deleteProductPhoto } = require('../../application/photo/delete.product.photo');
const { addProductPhoto } = require('../../application/photo/add.product.photo');

exports.editProductController = async (req, res) => {

	const Authorization  = req.rawHeaders[req.rawHeaders.indexOf('Authorization') + 1];

	if (!Authorization) {
		return res.status(401).send({ err: 'Authorization token missing'});
	}

	const accessToken = Authorization.split(' ')[1];

	if (!accessToken) return res.status(401).send({ err: 'Authorization missing'});
	const { userId } = jwt.verify(accessToken, process.env.JWT_SECRET);

  try {
    const curMerchant = await merchantModel.findOne({_id: userId});
		
		console.log(req.body, req.files);

		let request = {
			productName: req.body.productName,
			category: req.body.category,
			strain: req.body.strain,
			thcLevel: req.body.thcLevel,
			type: req.body.type,
			weightAndPrice: JSON.parse(req.body.weightAndPrice),
			description: req.body.description,
			mid: req.body.mid,
			photos: []
		}
		const updatingProduct = await productModel.findOne({ mid: req.body.mid });
		for (let i = 0; i < updatingProduct.photos.length; i++) {
			if (!req.body[`image_${i}`]) {
				await deleteProductPhoto([updatingProduct.photos[i]]);
			} else {
				request.photos.push(req.body[`image_${i}`]);
			}
		}

    const preProducts = curMerchant.menu ? curMerchant.menu.products.filter(p => p.mid != req.body.mid) : [];

		const photos = await addProductPhoto(req.files);
		console.log(photos);

		request.photos = [...request.photos, ...photos];

		await productModel.updateOne({ mid: req.body.mid }, request);

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
