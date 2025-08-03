const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer");

const {checkRole, authenticate} = require("../middlewares/auth");

// sipariş oluştur
router.post("/order-requests",authenticate,checkRole("customer"),customerController.createOrderRequest);

router.get("/product-types", authenticate, checkRole("customer"),adminController.getProductTypes);

// siparişleri listele
router.get("/order-requests",authenticate,checkRole("customer"),customerController.getAllOrders);
router.get("/order-request/:orderId",authenticate,checkRole("customer"),customerController.getOrderDetails);


module.exports = router;