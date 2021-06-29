const mongoose = require('mongoose');
const reviewModel = require('../../models/review/review').reviewModel;

exports.getAllReviewsController = async (req, res) => {
	const userId = req.userId;
  try {
		const results = await reviewModel.find({ merchant: userId})
			.populate({ path: 'customer', model: 'users' })
			.populate({ path: 'product', model: 'products' });
    return res.status(200).send({ review: results });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}
