const productControllers = require("../controllers/porductControllers");
const router = require("express").Router();
const { getOneProductValidator, createProductValidator, updateProductValidator, deleteProductValidator } = require("../utils/validators/productValidator");
const { verifyToken } = require("../middlewares/verifyToken");
const { restrictTo } = require("../controllers/authControllers");


router.route("/createProduct")
    .post(verifyToken, restrictTo("admin"), createProductValidator, productControllers.createProduct);

router.route('/')
    .get(productControllers.getAllProducts);

router.route('/:ID')
    .get(getOneProductValidator, productControllers.getOneProduct)
    .patch(verifyToken, restrictTo("admin"), updateProductValidator, productControllers.updateProduct)
    .delete(verifyToken, restrictTo("admin"), deleteProductValidator, productControllers.deletOneProduct)


module.exports = router;
