const mongoose = require('mongoose');

const walletSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,

    },

    balance: {
        type: Number,
        default: 0,
    },
    pendingbalance: {
        type: Number,
        default: 0,
    },
    transection: {
        recieved: {
            type: Number,
            default: 0,
        },
        send: {
            type: Number,
            default: 0,
        },
        pendingbalance: {
            type: Number,
            default: 0,
        }
    },
    load: {
        type: Number,
        default: 0,
    },
    scheme: {
        invested: {
            type: Number,
            default: 0,
        },
        taken: {
            type: Number,
            default: 0,
        },
    }
});

const walletModel = mongoose.model("wallet", walletSchema);
module.exports = walletModel;

