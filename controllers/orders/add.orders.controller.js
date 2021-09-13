const mongoose = require('mongoose');
const ordersModel = require('../../models/orders/orders').ordersModel;
const { addLicensePhoto } = require('../../application/photo/add.license.photo');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const myEnv = dotenv.config();

exports.addOrdersController = async (req, res) => {
	const merchantId = req.body.merchantId;
    const customerId = req.body.customerId;
    const anonymous = JSON.parse(req.body.anonymous);
    const dispensaryId = req.body.dispensaryId;
	const requestedTime = req.body.requestedTime;
    const orderType = req.body.orderType;
    const quantity = JSON.parse(req.body.quantity);
    const status = 'requested';
    const license = await addLicensePhoto(req.files);
    
    let products = [];
    let i = 0;
    for (let product of JSON.parse(req.body.products)) {
        let wpq = [];
        let j = 0;
        let subTotal = 0;
        for (let wp of product.weightAndPrice) {
            if (wp) {
                wpq.push({
                    "wp_id": j,
                    "quantity": quantity[i][j]
                });
                subTotal += wp.price * quantity[i][j];
            }
            j++;
        }
        products.push({
            productId: product._id,
            wpq: wpq,
            subTotal: subTotal
        });
        i++;
    }

    let newOrder = {
		_id: new mongoose.Types.ObjectId(),
		requestedTime: requestedTime,
		status: status,
		orderType: orderType,
		completedTime: 0,
        anonymous: anonymous,
        dispensary: dispensaryId,
        products : products,
        license: license
    };
    if ( merchantId != undefined && merchantId != 'undefined' )
        newOrder.merchantId = merchantId;

    if ( customerId != undefined && customerId != 'undefined' )
        newOrder.customerId = customerId;

    if (anonymous.accessToken !== '') {
        try {
            const { userId } = jwt.verify(anonymous.accessToken.split(' ')[1], process.env.JWT_SECRET);
            newOrder.customerId = new mongoose.Types.ObjectId(userId);
        } catch (err) {
            console.log(err);
        }
    }

    let newOrderSchema = new ordersModel(newOrder);
    console.log(newOrder);
    try {
        await newOrderSchema.save();
        return res.status(200).send(newOrder);
    } catch (err) {
        console.log(err);
		return res.status(500).send({ err: err });
    }
}
