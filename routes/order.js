const { requireSignin, CustomerMiddleware } = require("../middlewares/permissions/permission");
const { addOrder, getOrders, getOrder } = require("../controllers/order");
const router = require("express").Router();

router.post("/addOrder", requireSignin, CustomerMiddleware, addOrder);
router.get("/getOrders", requireSignin, CustomerMiddleware, getOrders);


module.exports = router;