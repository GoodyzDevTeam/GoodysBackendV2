const mongoose = require('mongoose');
const reviewModel = require('../../models/review/review').reviewModel;

exports.replyController = async (req, res) => {
	const userId = req.userId;
	console.log(req.body);
  try {
		const curReview = await reviewModel.findOne({ _id: req.body.replyId });
		let temp = JSON.parse(JSON.stringify(curReview.replies));
		temp.push({
			sender: req.body.sender,
			message: req.body.message,
			createdAt: req.body.createdAt
		});
		await reviewModel.updateOne({ _id: req.body.replyId }, { replies: temp });
		const results = await reviewModel.find({ merchant: userId})
			.populate({ path: 'customer', model: 'users' })
			.populate({ path: 'product', model: 'products' });
    return res.status(200).send({ review: results });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}
