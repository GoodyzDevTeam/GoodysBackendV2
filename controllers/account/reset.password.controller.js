const mongoose = require('mongoose');
const users = require('../../models/users').usersModel;
const jwt = require('jsonwebtoken');

exports.resetPasswordController = (req, res) => {

	try {
		
		users.updateOne({email: req.body.email, password: req.body.password}, {password: req.body.newPassword}, (err, data) => {
			console.log(data);
			if (err) {
				return res.status(500).send({ message: 'Internal server error'});
			} else if (data != undefined && data != null) {
				if (data.n == 0) {
					return res.status(401).send({ message: 'Password mismatch'});
				}
				
				users.findOne({email: req.body.email, password: req.body.newPassword}, (err, doc) => {
					
					const accessToken = jwt.sign({ userId: doc._id }, process.env.JWT_SECRET, {
						expiresIn: process.env.JWT_EXPIRES_IN
					});
					
					return res.json({ status: 200, user: doc,  accessToken });
				});
			} else {
				return res.status(401).send({ message: 'Password mismatch'});
			}
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: 'Internal server error'});
	}
}