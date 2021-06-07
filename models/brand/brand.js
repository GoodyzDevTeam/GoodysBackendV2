const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const brand = {
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

const brandSchema = new Schema(brand);

brandSchema.pre('save', next => {
    let ts = Math.round((new Date()).getTime() / 1000);
    if (!this.createdAt) {
        this.createdAt = ts;
    }
    next();
});

brandSchema.plugin(mongoosePaginate);

module.exports = {
    brand,
    brandModel: mongoose.model('brands', brandSchema)
}
