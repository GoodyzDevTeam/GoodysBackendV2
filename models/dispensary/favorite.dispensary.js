const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const favoriteDispensary = {
	user: {
		type: mongoose.Types.ObjectId
	},
	dispensary: {
		type: mongoose.Types.ObjectId
	}
};

const favoriteDispensarySchema = new Schema(favoriteDispensary);

favoriteDispensarySchema.pre('save', next => {
	let ts = Math.round((new Date()).getTime() / 1000);
	if (!this.createdAt) {
			this.createdAt = ts;
	}
	next();
});

favoriteDispensarySchema.plugin(mongoosePaginate);

module.exports = {
	favoriteDispensary,
	favoriteDispensaryModel: mongoose.model('favoriteDispensaries', favoriteDispensarySchema)
}
