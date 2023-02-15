const express = require('express');
const { addItemToCart, getCartItems } = require('../controllers/cart');
const { requireSignin, CustomerMiddleware } = require('../middlewares/permissions/permission');
const router = express.Router();


router.post('/user/cart/addtocart',requireSignin,CustomerMiddleware,addItemToCart);
router.post('/user/cart/getcart',requireSignin,CustomerMiddleware,getCartItems);


module.exports = router;