const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderName: String,
    orderCost: Number,
    orderAmount: Number,
    orderTime: Date,
    cartId: String,
    productId: String,
    productCost: Number,
    userId: String,
    userAddress: String,
});



orderSchema.pre("findOneAndUpdate", async function (next) {
    console.log(7);
    if (this._update.orderAmount) {
        const order = await this.model.findOne(this.getQuery());
        if (order) {
            order.orderCost = order.productCost * this._update.orderAmount;
            await order.save();
        }
    }
    next();
});

module.exports = mongoose.model('Order', orderSchema);