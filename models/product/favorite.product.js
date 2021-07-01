const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const favoriteProduct = {
    user: {
        type: mongoose.Types.ObjectId
    },
    product: {
        type: mongoose.Types.ObjectId
    }
};

const favoriteProductSchema = new Schema(favoriteProduct);

favoriteProductSchema.pre('save', next => {
    let ts = Math.round((new Date()).getTime() / 1000);
    if (!this.createdAt) {
        this.createdAt = ts;
    }
    next();
});

favoriteProductSchema.plugin(mongoosePaginate);

module.exports = {
    favoriteProduct,
    favoriteProductModel: mongoose.model('favoriteProducts', favoriteProductSchema)
}
