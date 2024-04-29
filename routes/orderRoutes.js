const router = require("express").Router();
const orderControllers = require("../controllers/orderControllers");
const { verifyToken } = require("../middlewares/verifyToken");


router.route("/createOrder")
    .post(verifyToken, orderControllers.createOrder)
router.route("/")
    .get(verifyToken, orderControllers.getAllOrders)

router.route("/getOneOrder/:ID")
    .get(verifyToken, orderControllers.getOneOrder)

router.route("/updateOrder/:ID")
    .patch(verifyToken, orderControllers.updateOrder)

router.route("/deleteOneOrder/:ID")
    .get(verifyToken, orderControllers.deletOneOrder)

module.exports = router;