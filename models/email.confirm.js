let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let Schema = mongoose.Schema;

let emailConfirm = {
    type: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    }
}

let emailConfirmSchema = new Schema(emailConfirm);

emailConfirmSchema.pre('save', next => {
    let ts = Math.round((new Date()).getTime() / 1000);
    if (!this.createdAt) {
        this.createdAt = ts;
    }
    next();
});

emailConfirmSchema.plugin(mongoosePaginate);

module.exports = {
    emailConfirm,
    emailConfirmModel: mongoose.model('emailConfirm', emailConfirmSchema)
}