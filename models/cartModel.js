const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    productName: String,
    productPrice: Number,
    productAmount: Number,
    productId: String,
    userId: String,
    totalCartPrice: Number,
    productTime: Date
});

module.exports = mongoose.model('Cart', cartSchema);