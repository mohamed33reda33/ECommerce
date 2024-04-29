const Cart = require("../models/cartModel");
const asyncWrapper = require("../middlewares/asyncWrapper");
const Product = require("../models/productModel");
const handlerFactory = require("./handlersFactory");
const ApiError = require("../utils/apiError");


exports.getAllCartsByUserId = handlerFactory.getAll(Cart, "carts");



exports.addToCart = asyncWrapper(async (req, res, next) => {
    const { productId, productAmount } = req.body;
    if (!productId || !productAmount) return next(new ApiError(`Product Id and amount are required`), 401);
    if (productAmount < 1) return next(new ApiError(`Product amount should be 1 or more`), 401);
    const product = await Product.findById(productId);

    const totalPrice = productAmount * product.price;

    const oldCart = await Cart.findOneAndUpdate(
        { productId: productId, userId: req.user._id },
        {
            $set: { "productTime": Date.now() },
            $inc: { "totalCartPrice": +totalPrice, "productAmount": +productAmount }
        },
        { new: true }
    );
    if (oldCart) {
        return res.status(201).json({ oldCart });
    }
    const newCart = new Cart({

        productName: product.title,
        productAmount,
        productPrice: product.price,
        productId,
        userId: req.user._id,
        totalCartPrice: totalPrice,
        productTime: Date.now()
    });
    await newCart.save();
    return res.status(201).json({ newCart });
});

exports.deleteOneCart = asyncWrapper(async (req, res, next) => {
    await Cart.deleteOne({ _id: req.body.cartId, userId: req.user._id });
    return res.status(201).json({ msg: "cart deleted" });
});

exports.deleteAllCarts = asyncWrapper(async (req, res, next) => {
    await Cart.deleteMany({ userId: req.user._id });
    return res.status(201).json({ msg: "All carts of user deleted" });
});



