const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const asyncWrapper = require("../middlewares/asyncWrapper");
const ApiError = require("../utils/apiError");
const handlerFactory = require("./handlersFactory");


exports.createOrder = asyncWrapper(async (req, res, next) => {
    const { cartId, userAddress } = req.body;

    let order = await Order.findOne({ cartId });
    if (order) return res.status(201).json({ msg: `order is already exist` });

    const cart = await Cart.findById(cartId);
    if (!cart) return next(new ApiError(`no cart found by this cartId`), 401);
    order = await Order.create({
        orderName: cart.productName,
        orderCost: cart.totalCartPrice,
        orderAmount: cart.productAmount,
        productCost: cart.productPrice,
        orderTime: Date.now(),
        cartId: cartId,
        userId: cart.userId,
        userAddress: userAddress
    })
    return res.status(201).json({ order });
});

exports.getAllOrders = handlerFactory.getAll(Order, "orders");
exports.getOneOrder = handlerFactory.getOne(Order);

exports.updateOrder = handlerFactory.updateOne(Order);
exports.deletOneOrder = handlerFactory.deleteOne(Order);

