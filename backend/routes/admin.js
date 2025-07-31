const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

const {checkRole, authenticate} = require("../middlewares/auth");

router.get("/users",authenticate,checkRole("admin"),adminController.getAllUsers);
router.get("/customers",authenticate,checkRole("admin"),adminController.getCustomers);
router.get("/suppliers",authenticate,checkRole("admin"),adminController.getSuppliers);


//product_types
router.get("/product-types", authenticate, checkRole("admin", "customer"),adminController.getProductTypes);
router.post("/product-types", authenticate, checkRole("admin"),adminController.postProductTypes);


module.exports = router;