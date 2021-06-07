const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const dispensary = {
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    },
    mainImage: {
        type: String
    },
    images: [{
        type: String
    }],
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
    }
};

const dispensarySchema = new Schema(dispensary);

dispensarySchema.pre('save', next => {
    let ts = Math.round((new Date()).getTime() / 1000);
    if (!this.createdAt) {
        this.createdAt = ts;
    }
    next();
});

dispensarySchema.plugin(mongoosePaginate);

module.exports = {
    dispensary,
    dispensaryModel: mongoose.model('dispensaries', dispensarySchema)
}
