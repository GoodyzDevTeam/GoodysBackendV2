const mongoose = require('mongoose');
const users = require('../../models/users/users').usersModel;
const emailConfirm = require('../../models/users/email.confirm').emailConfirmModel;
const { getAccessToken } = require('../../auth/auth');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

exports.updatePasswordController = (req, res) => {

	try {

		const email = req.body.email;
		const key = req.body.key;
		const password = req.body.password;
		console.log(email, key, password);

		emailConfirm.findOne({type: 'reset-password', email: email, key: key}, (err, requested) => {
			if (err) return res.status(500).send({ err: error});
			if (!requested) return res.status(404).send({ err: new Error('email not verified')});

			users.updateOne({email: email, password: password}, async (err, data) => {
				console.log(data);
				if (err) {
					return res.status(500).send({ message: 'Internal server error'});
				} else if (data != undefined && data != null) {
					if (data.n == 0) {
						return res.status(404).send({ message: 'User not found'});
					}
					
					await emailConfirm.deleteOne({type: 'reset-password', email: email});
					
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