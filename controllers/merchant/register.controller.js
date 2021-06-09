const mongoose = require('mongoose');
const merchantModel = require('../../models/merchant/merchant').merchantModel;
const { getAccessToken } = require('../../auth/auth');

exports.registerController = (req, res, next) => {
	try {
		let saveMerchant = () => {
			const merchant = new merchantModel({
                _id: new mongoose.Types.ObjectId()
            });
            merchant.fullName = req.body.firstName + ' ' + req.body.lastName;
            merchant.firstName = req.body.firstName;
            merchant.lastName = req.body.lastName;
			merchant.email = req.body.email;
			merchant.password = req.body.password;
			merchant.role = '0'; // the value 0 means 'registered, not approved'
		
			merchant.save((err, doc) => {
				if (err) {
					return res.status(500).send({ message: 'Internal server error'});
				}
				const accessToken = getAccessToken(doc._id);
		
				return res.json({status: 200, accessToken, merchant });
			});
		}
		merchantModel.findOne({email: req.body.email}, function(err, data) {
			if (err) {
				return res.status(500).send({ message: 'Internal server error'});
			} else if (data != undefined && data != null) {
				if (data.length == 0) {
					return saveMerchant();
				}
				return res.status(400).send({ message: "auth/email-already-in-use"});
			} else {
				return saveMerchant();
			}
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: 'Internal server error'});
	}
}