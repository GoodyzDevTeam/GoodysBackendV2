const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const users = {
    displayName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photoURL: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    country: {
        type: String
    },
    address: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    zipCode: {
        type: String
    },
    about: {
        type: String
    },
    role: {
        type: String
    },
    isPublic: {
        type: Boolean
    }
}

const usersSchema = new Schema(users);

usersSchema.pre('save', next => {
    let ts = Math.round((new Date()).getTime() / 1000);
    if (!this.createdAt) {
        this.createdAt = ts;
    }
    next();
});

usersSchema.plugin(mongoosePaginate);

module.exports = {
    users,
    usersModel: mongoose.model('users', usersSchema)
}