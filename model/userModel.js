const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: {
        type: String,

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    walletId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'wallet',
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    }
});



const userModel = mongoose.model("users", userSchema);
module.exports = userModel;