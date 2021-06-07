const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const category = {
    name: {
        type: String,
        required: true
    },
    subCategory: [{
        type: mongoose.Types.ObjectId
    }],
    mainImage: {
        type: String
    },
    images: [{
        type: String
    }]
};

const categorySchema = new Schema(category);

categorySchema.pre('save', next => {
    let ts = Math.round((new Date()).getTime() / 1000);
    if (!this.createdAt) {
        this.createdAt = ts;
    }
    next();
});

categorySchema.plugin(mongoosePaginate);

module.exports = {
    category,
    categoryModel: mongoose.model('categories', categorySchema)
}