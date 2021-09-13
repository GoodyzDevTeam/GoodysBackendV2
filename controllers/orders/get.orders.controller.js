const mongoose = require('mongoose');
const ordersModel = require('../../models/orders/orders').ordersModel;

exports.getOrdersController = async (req, res) => {
	const userId = req.userId;
	console.log(userId);
  try {
		// const results = await ordersModel.find({ merchant: userId})
		// 	.populate({ path: 'customer', model: 'users' })
		// 	.populate({ path: 'products.product', model: 'products' });
		let results = [];
		const orders = await ordersModel.find({}).populate({ path: 'products.productId', model: 'products' });
		// const orders = await ordersModel.find({});
		for (let order of orders) {
			console.log(JSON.stringify(order));
			if (order.products[0].productId.merchant == userId) {
				results.push(order);
			}
		}
		console.log(results);
    return res.status(200).send({ orders: results });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}

/*
const a = new ordersModel({
		_id: new mongoose.Types.ObjectId(),
		requestedTime: new Date().getTime(),
		status: 'inprogress',
		orderType: 'delivery',
		completedTime: 0,
		"merchantId" : "60bf22295f56963be78a378a",
		"customerId" : "60afb77f1070f3640258b97b",
		"products" : [ 
				{
						"productId" : "60d24e3008221c0c400ee96d",
						"wpq" : [ 
								{
										"wp_id" : "1",
										"quantity" : "2"
								}
						],
						"subTotal" : ""
				}, 
				{
						"productId" : "60d24e3008221c0c400ee96f",
						"wpq" : [ 
								{
										"wp_id" : "2",
										"quantity" : "2"
								}, 
								{
										"wp_id" : "4",
										"quantity" : "3"
								}
						],
						"subTotal" : ""
				}
		]
	});
	await a.save();
*/