const Product = require("../models/productModel");
const handlerFactory = require("./handlersFactory");


const createProduct = handlerFactory.create(Product);
const getAllProducts = handlerFactory.getAll(Product, "products");
const getOneProduct = handlerFactory.getOne(Product);
const updateProduct = handlerFactory.updateOne(Product);
const deletOneProduct = handlerFactory.deleteOne(Product);
module.exports = { createProduct, getAllProducts, getOneProduct, updateProduct, deletOneProduct };