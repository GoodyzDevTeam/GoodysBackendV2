const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const subCategory = {
    name: {
        type: String,
        required: true
    },
    mainCategory: {
        type: mongoose.Types.ObjectId
    },
    mainImage: {
        type: String
    },
    images: [{
        type: String
    }]
};

const subCategorySchema = new Schema(subCategory);

subCategorySchema.pre('save', next => {
    let ts = Math.round((new Date()).getTime() / 1000);
    if (!this.createdAt) {
        this.createdAt = ts;
    }
    next();
});

subCategorySchema.plugin(mongoosePaginate);

module.exports = {
    subCategory,
    subCategoryModel: mongoose.model('subCategory', subCategorySchema)
}