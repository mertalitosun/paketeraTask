const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplier");

const {checkRole, authenticate} = require("../middlewares/auth");

router.get("/order-requests",authenticate,checkRole("supplier"),supplierController.getOrders);
router.get("/order-request/:orderId",authenticate,checkRole("supplier"),supplierController.getOrderDetails);

module.exports = router;
