const User = require("../models/userModel");
const { signJWT } = require("../utils/signJWT");
const asyncWrapper = require("../middlewares/asyncWrapper");
const ApiError = require("../utils/apiError");
const { sendEmail } = require("../utils/email");
const crypto = require("crypto");

exports.signup = asyncWrapper(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });
    const token = signJWT(newUser._id)

    res.status(201).json({
        status: `success`,
        token,
        data: {
            user: newUser
        }
    })
});

exports.login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email && !password)
        return next(new ApiError(`Please enter your email and password`, 400));

    const user = await User.findOne({ email }).select(`+password`);

    if (!user || !await user.correctPassword(password, user.password))
        return next(new ApiError(`Check your email and password`, 401));

    const token = signJWT(user._id);
    return res.status(200).json({
        status: "success",
        token
    });
});

exports.forgetPassword = asyncWrapper(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return next(new ApiError(`user not found`, 404));
    const resetToken = await user.generateResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetURL = `${req.protocol}://${req.get(`host`)}/api/users/resetPassword/${resetToken}`
    const message = `please go to this URL to reset password (${resetURL})`;
    try {
        await sendEmail({
            email: user.email,
            subject: `reset password token (valid for 10m)`,
            message
        });
        return res.status(201).json({ msg: "reset url send to your email" });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        user.save({ validateBeforeSave: false });
        return next(new ApiError(err, 500));
    }
});

exports.resetPassword = asyncWrapper(async (req, res, next) => {
    const hashedToken = crypto.createHash(`sha256`).update(req.params.ResetToken).digest(`hex`);
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });
    if (!user)
        return next(new ApiError(`Invaled token, please try agin liter`), 400);

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    const token = signJWT(user._id);
    return res.status(200).json({
        status: "success",
        token
    });
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role))
            return next(new ApiError("you dont have permission to this action"), 403);
        next();
    }
}