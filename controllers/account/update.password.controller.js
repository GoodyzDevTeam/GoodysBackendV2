const mongoose = require('mongoose');
const users = require('../../models/users').usersModel;
const emailConfirm = require('../../models/email.confirm').emailConfirmModel;
const { getAccessToken } = require('../../auth/auth');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

exports.updatePasswordController = (req, res) => {

	try {

		const email = jwt.verify(req.body.token, process.env.JWT_SECRET).userId;

		emailConfirm.findOne({type: 'reset-password', key: email}, (err, requested) => {
			if (err) return res.status(500).send({ err: error});
			if (!requested) return res.status(404).send({ err: new Error('email not verified')});

			users.updateOne({email: email, password: req.body.password}, async (err, data) => {
				console.log(data);
				if (err) {
					return res.status(500).send({ message: 'Internal server error'});
				} else if (data != undefined && data != null) {
					if (data.n == 0) {
						return res.status(404).send({ message: 'User not found'});
					}
					
					await emailConfirm.deleteOne({type: 'reset-password', key: email});
					
					return res.json({ status: 200, message: 'email sent' });
				} else {
					return res.status(401).send({ message: 'Password mismatch'});
				}
			});
		});
		
	} catch (error) {
		return res.status(500).send({ err: error});
	}
}