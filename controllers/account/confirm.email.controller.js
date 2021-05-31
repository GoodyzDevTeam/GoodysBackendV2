const mongoose = require('mongoose');
const users = require('../../models/users').usersModel;
const { getAccessToken } = require('../../auth/auth');

exports.confirmEmailController = (req, res) => {
	const token = req.query.token;

	try {
		return res.redirect(200, `${process.env.FRONT_END_BASE_URL}/auth/update-password/${token}`);
	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: 'Internal server error'});
	}
}