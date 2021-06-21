const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const product = {
    productName: {
        type: String,
        required: true
    },
    weightAndPrice: [{
        type: Object
    }],
    strain: {
        type: String
    },
    type: {
        type: String
    },
    brand: {
        type: String
    },
    thcLevel: {
        type: String
    },
    quantity: {
        type: Number
    },
    rating: {
        type: Number
    },
    merchant: {
        type: mongoose.Types.ObjectId
    },
    category: {
        type: mongoose.Types.ObjectId
    },
    mainImage: {
        type: String
    },
    photos: [{
        type: String
    }],
    description: {
        type: String
    },
    featuredProduct: {
        type: String
    },
    mid: {
        type: String
    }
};

const productSchema = new Schema(product);

productSchema.pre('save', next => {
    let ts = Math.round((new Date()).getTime() / 1000);
    if (!this.createdAt) {
        this.createdAt = ts;
    }
    next();
});

productSchema.plugin(mongoosePaginate);

module.exports = {
    product,
    productModel: mongoose.model('products', productSchema)
}
