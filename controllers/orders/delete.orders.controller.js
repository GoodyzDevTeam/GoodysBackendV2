const mongoose = require('mongoose');
const ordersModel = require('../../models/orders/orders').ordersModel;

exports.deleteOrdersController = async (req, res) => {
	const userId = req.userId;
	console.log(userId);
  try {
		const orderId = req.body.orderId;
		await ordersModel.deleteOne({_id: orderId});
    return res.status(200).send({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}