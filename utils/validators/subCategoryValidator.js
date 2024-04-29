const { check, body } = require('express-validator');
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const { default: slugify } = require('slugify');


exports.createSubCategoryValidator = [
    check('name')
        .notEmpty().withMessage('SubCategory name is required')
        .isLength({ min: 2 }).withMessage('Too short category name')
        .isLength({ max: 32 }).withMessage('Too long category name')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),
    check('category')
        .notEmpty().withMessage('Category id is required')
        .isMongoId().withMessage('invalid category id format'),
    validatorMiddleware
];

exports.getOneSubCategoryValidator = [
    check('ID').isMongoId().withMessage('invalid subcategory id format'),
    validatorMiddleware
];
exports.updateSubCategoryValidator = [
    check('ID').isMongoId().withMessage('invalid subCategory id format'),
    body("name").custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
    }),
    validatorMiddleware
];

exports.deletOneSubCategoryValidator = [
    check('ID').isMongoId().withMessage('invalid subCategory id format'),
    validatorMiddleware
];

