const {mongoose} = require('../db/mongoose');

const Burger = mongoose.model('Burger', {
    name: {
        type: String,
        required: true,
        minLength: 5,
        trim: true
    },
    beef: {
        type: String
    },
    cheese: {
        type: String
    },
    bun: {
        type: String
    },
    price: {
        type: Number,
        default: 0.0
    }
});

module.exports = {
    Burger
};