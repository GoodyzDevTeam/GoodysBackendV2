const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const deal = {
    name: {
        type: String,
        required: true
    },
    mainImage: {
        type: String
    },
    images: [{
        type: String
    }],
    letter: {
        type: String
    },
    rating: {
        type: Number
    },
    type: {
        type: String
    },
    status: {
        type: String
    },
    orderType: {
        type: String
    },
    intro:{
        type: String
    },
};

const dealSchema = new Schema(deal);

dealSchema.pre('save', next => {
    let ts = Math.round((new Date()).getTime() / 1000);
    if (!this.createdAt) {
        this.createdAt = ts;
    }
    next();
});

dealSchema.plugin(mongoosePaginate);

module.exports = {
    deal,
    dealModel: mongoose.model('deals', dealSchema)
}
