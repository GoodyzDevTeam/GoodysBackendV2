const mongoose = require('mongoose');
const ordersModel = require('../../models/orders/orders').ordersModel;

exports.updateOrdersController = async (req, res) => {
	const userId = req.userId;
	console.log(userId);
  try {
		const requestBody = req.body.order;
    const params = JSON.parse(requestBody);
		await ordersModel.updateOne({_id: params._id}, params);
    return res.status(200).send({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}
