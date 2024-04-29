const SubCategory = require("../models/subCategoryModel");
const handlerFactory = require("./handlersFactory");

const setCategoryIDToBody = (req, res, next) => {
    if (!req.body.category) req.body.category = req.params.ID;
    next();
}
const createSubCategory = handlerFactory.create(SubCategory);
const getAllSubCategorys = handlerFactory.getAll(SubCategory, "subcategorys");
const getOneSubCategory = handlerFactory.getOne(SubCategory);
const updateSubCategory = handlerFactory.updateOne(SubCategory);
const deletOneSubCategory = handlerFactory.deleteOne(SubCategory);
module.exports = { createSubCategory, getAllSubCategorys, getOneSubCategory, updateSubCategory, deletOneSubCategory, setCategoryIDToBody };