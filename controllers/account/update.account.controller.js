
const mongoose = require('mongoose');
const users = require('../../models/users').usersModel;
const jwt = require('jsonwebtoken');

exports.updateAccountController = (req, res) => {

	try {
		const { userId } = req;

		users.updateOne({_id: userId}, {...req.body}, (err, data) => {
			if (err) {
				return res.status(500).send({ message: 'Internal server error'});
			} else if (data != undefined && data != null) {
				if (data.length == 0) {
					return res.status(401).send({ message: 'User not exists'});
				}
				users.findOne({_id: userId}, (err, doc) => {
					const accessToken = jwt.sign({ userId: doc._id }, process.env.JWT_SECRET, {
						expiresIn: process.env.JWT_EXPIRES_IN
					});
	
					return res.json({ status: 200, user: doc,  accessToken });
				});
			} else {
				return res.status(401).send({ message: 'User not exists'});
			}
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: 'Internal server error'});
	}
}