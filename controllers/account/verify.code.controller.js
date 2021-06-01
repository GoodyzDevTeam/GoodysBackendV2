const mongoose = require('mongoose');
const users = require('../../models/users').usersModel;
const { getAccessToken } = require('../../auth/auth');
const emailConfirm = require('../../models/email.confirm').emailConfirmModel;

exports.verifyCodeController = (req, res) => {
	
	const email = req.body.email;
	const key = req.body.key;
	const password = req.body.password;
	
	try {
		emailConfirm.findOne({type: 'reset-password', email: email, key: key}, (err, requested) => {
			if (err) return res.status(401).send({err: 'Check confirmation email'});
			if (!requested) return res.status(401).send({err: 'Check confirmation email'});
			return res.status(200).send('OK');
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: 'Internal server error'});
	}
}