const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const merchant = {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    fullName: {
        type: String
    },
    rating: {
        type: Number
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    category: [{
        type: mongoose.Types.ObjectId
    }],
    product: [{
        type: mongoose.Types.ObjectId
    }],
    mainImage: {
        type: String
    },
    images: [{
        type: String
    }],
    overView: {
        type: String
    }
};

const merchantSchema = new Schema(merchant);

merchantSchema.pre('save', next => {
    let ts = Math.round((new Date()).getTime() / 1000);
    if (!this.createdAt) {
        this.createdAt = ts;
    }
    next();
});

merchantSchema.plugin(mongoosePaginate);

module.exports = {
    merchant,
    merchantModel: mongoose.model('merchant', merchantSchema)
}
