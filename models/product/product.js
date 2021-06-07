const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const product = {
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    weight: {
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
    images: [{
        type: String
    }],
    description: {
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
