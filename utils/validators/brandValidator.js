const { check, body } = require('express-validator');
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const { default: slugify } = require('slugify');

exports.getOneBrandValidator = [
    check('ID').isMongoId().withMessage('invalid Brand id format'),
    validatorMiddleware
];

exports.createBrandValidator = [
    check('name')
        .notEmpty().withMessage('Brand name is required')
        .isLength({ min: 3 }).withMessage('Too short Brand name')
        .isLength({ max: 32 }).withMessage('Too long Brand name')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),
    validatorMiddleware
];

exports.updateBrandValidator = [
    check('ID').isMongoId().withMessage('invalid Brand id format'),
    body("name").custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
    }),
    validatorMiddleware
];

exports.deleteBrandValidator = [
    check('ID').isMongoId().withMessage('invalid Brand id format'),
    validatorMiddleware
];