const express = require('express');
const { addCategory, getCategories } = require('../controllers/category');
const { requireSignin, adminMiddleware } = require('../middlewares/permissions/permission');
const router = express.Router();


router.post('/category/create',requireSignin,adminMiddleware,addCategory);
router.get('/category/getCategory',getCategories);



module.exports = router;