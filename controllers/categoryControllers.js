const Category = require("../models/categoryModel");
const handlerFactory = require("./handlersFactory");

const createCategory = handlerFactory.create(Category);
const getAllCategorys = handlerFactory.getAll(Category, "categorys");
const getOneCategory = handlerFactory.getOne(Category);
const updateCategory = handlerFactory.updateOne(Category);
const deletOneCategory = handlerFactory.deleteOne(Category);

module.exports = { createCategory, getAllCategorys, getOneCategory, updateCategory, deletOneCategory };