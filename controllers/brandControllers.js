const Brand = require("../models/brandModel");
const handlerFactory = require("./handlersFactory");

const createBrand = handlerFactory.create(Brand);
const getAllBrands = handlerFactory.getAll(Brand, "brands");
const getOneBrand = handlerFactory.getOne(Brand);
const updateBrand = handlerFactory.updateOne(Brand);
const deletOneBrand = handlerFactory.deleteOne(Brand);

module.exports = { createBrand, getAllBrands, getOneBrand, updateBrand, deletOneBrand };