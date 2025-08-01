const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer");

const {checkRole, authenticate} = require("../middlewares/auth");

// sipariş oluştur
router.post("/order-requests",authenticate,checkRole("customer"),customerController.createOrderRequest);

// siparişleri listele
router.get("/order-requests",authenticate,checkRole("customer"),customerController.getAllOrders);


module.exports = router;