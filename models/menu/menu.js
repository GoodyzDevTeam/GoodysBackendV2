const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const menu = {
    merchantId: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    menu: {
        type: String
    }
};

const menuSchema = new Schema(menu);

menuSchema.pre('save', next => {
    let ts = Math.round((new Date()).getTime() / 1000);
    if (!this.createdAt) {
        this.createdAt = ts;
    }
    next();
});

menuSchema.plugin(mongoosePaginate);

module.exports = {
    menu,
    menuModel: mongoose.model('menus', menuSchema)
}
