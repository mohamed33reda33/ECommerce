const brandControllers = require("../controllers/brandControllers");
const router = require("express").Router();
const { getOneBrandValidator, createBrandValidator, updateBrandValidator, deleteBrandValidator } = require("../utils/validators/brandValidator");
const { verifyToken } = require("../middlewares/verifyToken");
const { restrictTo } = require("../controllers/authControllers");


router.route("/createBrand")
    .post(verifyToken, restrictTo("admin"), createBrandValidator, brandControllers.createBrand);

router.route('/')
    .get(brandControllers.getAllBrands);

router.route('/:ID')
    .get(getOneBrandValidator, brandControllers.getOneBrand)
    .patch(verifyToken, restrictTo("admin"), updateBrandValidator, brandControllers.updateBrand)
    .delete(verifyToken, restrictTo("admin"), deleteBrandValidator, brandControllers.deletOneBrand)


module.exports = router;
