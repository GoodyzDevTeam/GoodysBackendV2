const mongoose = require('mongoose');
const users = require('../../models/users').usersModel;
const emailConfirmModel = require('../../models/email.confirm').emailConfirmModel;
const { getAccessToken } = require('../../auth/auth');
const nodemailer = require('nodemailer');

exports.resetPasswordController = (req, res) => {

	console.log(req.body);

	try {
		
		users.findOne({email: req.body.email}, async (err, data) => {
			if (err) {
				return res.status(500).send({ message: 'Internal server error'});
			} else if (data != undefined && data != null) {
				if (data.n == 0) {
					return res.status(404).send({ message: 'User not found'});
				}

				await emailConfirmModel.deleteMany({type: 'reset-password', key: req.body.email});

				const emailConfirm = new emailConfirmModel({
					_id: new mongoose.Types.ObjectId(),
					type: 'reset-password',
					key: req.body.email
				});

				await emailConfirm.save();
				
                const token = getAccessToken(req.body.email);
                const transporter = nodemailer.createTransport({
                    service: process.env.EMAIL_SERVICE,
                    auth: {
                        user: process.env.ADMIN_EMAIL,
                        pass: process.env.EMAIL_PASS,
                    },
                });
            
				const confirmLink = `${process.env.BACK_END_BASE_URL}/api/account/confirm-email/?token=${token}`;
				console.log(confirmLink);
                const mailOptions = {
                    from: process.env.ADMIN_EMAIL,
                    to: req.body.email,
                    subject: process.env.CONFIRM_EMAIL_SUBJECT,
                    text: `${process.env.CONFIRM_EMAIL_QUATE}: ${confirmLink}`,
                };
            
                const sendEmailPromise = new Promise((resolve, reject) => {
					transporter.sendMail(mailOptions, (err, data) => {
						if (err) reject(err);
						resolve(data);
					});
				});

				await sendEmailPromise.then(data => {
					console.log(data);
				}).catch(err => {
					return res.status(500).send({ err: err});
				});
					
				return res.json({ status: 200, message: 'email sent' });
			} else {
				return res.status(401).send({ message: 'Password mismatch'});
			}
		});
	} catch (error) {
		return res.status(500).send({ err: error});
	}
}