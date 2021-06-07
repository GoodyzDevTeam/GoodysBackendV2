const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const delivery = {
    name: {
        type: String,
        required: true
    },
    fee: {
        type: Number
    },
    location: {
        type: String
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

const deliverySchema = new Schema(delivery);

deliverySchema.pre('save', next => {
    let ts = Math.round((new Date()).getTime() / 1000);
    if (!this.createdAt) {
        this.createdAt = ts;
    }
    next();
});

deliverySchema.plugin(mongoosePaginate);

module.exports = {
    delivery,
    deliveryModel: mongoose.model('delivery', deliverySchema)
}
