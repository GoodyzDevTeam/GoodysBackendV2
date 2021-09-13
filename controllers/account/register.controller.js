
const mongoose = require('mongoose');
const users = require('../../models/users/users').usersModel;
const { getAccessToken } = require('../../auth/auth');

exports.registerController = async (req, res, next) => {
	try {
		const _user = await users.findOne({email: req.body.email});
		if (_user) {
			return res.status(400).send({ message: "auth/email-already-in-use"});
		}

		const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

		const account = await stripe.accounts.create({
			type: 'express',
		});

		const user = new users({
			_id: new mongoose.Types.ObjectId()
		});

		user.displayName = req.body.firstName + ' ' + req.body.lastName;
		user.email = req.body.email;
		user.password = req.body.password;
		user.role = 'user';
		user.isPublic = true;
		user.stripeAccountId = account.id;
		await user.save();
		const accessToken = getAccessToken(user._id);
		return res.json({status: 200, accessToken, user });
		
	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: 'Internal server error'});
	}
}