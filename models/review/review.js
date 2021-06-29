const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const review = {
	customer: {
		type: Schema.Types.ObjectId
	},
	merchant: {
		type: Schema.Types.ObjectId
	},
	product: {
		type: Schema.Types.ObjectId
	},
	createdAt: {
		type: Date
	},
	rating: {
		type: Number
	},
	message: {
		type: String
	},
	replies: [{
		sender: {
			type: Number // 0: customer, 1: merchant, 
		},
		message: {
			type: String
		},
		createdAt: {
			type: Date
		}
	}]
};

const reviewSchema = new Schema(review);

reviewSchema.pre('save', next => {
	let ts = Math.round((new Date()).getTime() / 1000);
	if (!this.createdAt) {
		this.createdAt = ts;
	}
	next();
});

reviewSchema.plugin(mongoosePaginate);

module.exports = {
	review,
	reviewModel: mongoose.model('reviews', reviewSchema)
}
