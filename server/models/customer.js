const {mongoose} = require('../db/mongoose');

const Customer = mongoose.model('Customer', {
    name: {
        type: String,
        trim: true,
        minLength: 5,
        required: true
    },
    email: {
        type: String,
        trim: true,
        minLength: 5,
        required: true
    }
});

module.exports = {
    Customer
};