const { check, body } = require('express-validator');
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const { default: slugify } = require('slugify');


exports.getOneCategoryValidator = [
    check('ID').isMongoId().withMessage('invalid category id format'),
    validatorMiddleware
];

exports.createCategoryValidator = [
    check('name')
        .notEmpty().withMessage('Category name is required')
        .isLength({ min: 3 }).withMessage('Too short category name')
        .isLength({ max: 32 }).withMessage('Too long category name')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),
    validatorMiddleware
];

exports.updateCategoryValidator = [
    check('ID').isMongoId().withMessage('invalid category id format'),
    body("name").custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
    }),
    validatorMiddleware
];

exports.deleteCategoryValidator = [
    check('ID').isMongoId().withMessage('invalid category id format'),
    validatorMiddleware
];