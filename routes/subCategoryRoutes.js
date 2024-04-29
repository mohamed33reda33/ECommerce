const subCategoryControllers = require("../controllers/subCategoryControllers");
const router = require("express").Router({ mergeParams: true });
const { createSubCategoryValidator, getOneSubCategoryValidator, updateSubCategoryValidator, deletOneSubCategoryValidator } = require("../utils/validators/subCategoryValidator");
const { verifyToken } = require("../middlewares/verifyToken");
const { restrictTo } = require("../controllers/authControllers");



router.route("/")
    .get(subCategoryControllers.getAllSubCategorys)
    .post(verifyToken, restrictTo("admin"), subCategoryControllers.setCategoryIDToBody, createSubCategoryValidator, subCategoryControllers.createSubCategory);;

router.route("/:ID")
    .get(getOneSubCategoryValidator, subCategoryControllers.getOneSubCategory)
    .patch(verifyToken, restrictTo("admin"), updateSubCategoryValidator, subCategoryControllers.updateSubCategory)
    .delete(verifyToken, restrictTo("admin"), deletOneSubCategoryValidator, subCategoryControllers.deletOneSubCategory)

module.exports = router;
