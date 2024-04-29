const categoryControllers = require("../controllers/categoryControllers");
const { verifyToken } = require("../middlewares/verifyToken");
const router = require("express").Router();
const { getOneCategoryValidator, createCategoryValidator, updateCategoryValidator, deleteCategoryValidator } = require("../utils/validators/categoryValidator");
const subCategoryRoutes = require("./subCategoryRoutes");
const { restrictTo } = require("../controllers/authControllers");

router.use("/:ID/subCategorys", subCategoryRoutes);

router.route("/createCategory")
    .post(verifyToken, createCategoryValidator, categoryControllers.createCategory);

router.route('/')
    .get(categoryControllers.getAllCategorys);

router.route('/:ID')
    .get(getOneCategoryValidator, categoryControllers.getOneCategory)
    .patch(verifyToken, restrictTo("admin"), updateCategoryValidator, categoryControllers.updateCategory)
    .delete(verifyToken, restrictTo("admin"), deleteCategoryValidator, categoryControllers.deletOneCategory)


module.exports = router;
