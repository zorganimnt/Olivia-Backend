const express = require('express');
const router = express.Router();
const { signup, signin, requireSignin} = require('../../controllers/admin/auth')
const User = require('../../models/user')
const {checkUser} = require("../../middelware/verifyToken")

router.post('/admin/signup', signup);
router.post('/admin/signin', signin);
router.post("/", checkUser); 







module.exports = router;