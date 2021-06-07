
const mongoose = require('mongoose');
const users = require('../../models/users/users').usersModel;
const { getAccessToken } = require('../../auth/auth');

exports.registerController = (req, res, next) => {
	try {
		let saveUser = () => {
			user = new users;
			user.displayName = req.body.firstName + ' ' + req.body.lastName;
			user.email = req.body.email;
			user.password = req.body.password;
			user.role = 'user';
			user.isPublic = true;
			user.save((err, doc) => {
				if (err) {
					return res.status(500).send({ message: 'Internal server error'});
				}
				const accessToken = getAccessToken(doc._id);
		
				return res.json({status: 200, accessToken, user });
			});
		}
		users.findOne({email: req.body.email}, function(err, data) {
			if (err) {
				return res.status(500).send({ message: 'Internal server error'});
			} else if (data != undefined && data != null) {
				if (data.length == 0) {
					return saveUser();
				}
				return res.status(400).send({ message: "auth/email-already-in-use"});
			} else {
				return saveUser();
			}
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: 'Internal server error'});
	}
}