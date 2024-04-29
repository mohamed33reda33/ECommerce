const cartControllers = require("../controllers/cartControllers");
const router = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken");



router.route('/getAllCartsByUserId')
    .get(verifyToken, cartControllers.getAllCartsByUserId);

router.route('/addToCart')
    .post(verifyToken, cartControllers.addToCart);
router.route('/deleteOneCart')
    .delete(verifyToken, cartControllers.deleteOneCart);

router.route('/deleteAllCarts')
    .delete(verifyToken, cartControllers.deleteAllCarts);

module.exports = router;