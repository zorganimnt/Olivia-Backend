const express = require('express');
const router = express.Router();
const { signup, signin, requireSignin} = require('../controllers/auth')
const User = require('../models/user')
const {checkUser} = require("../middelware/verifyToken")

router.post('/signup', signup);
router.post('/signin', signin);
router.post("/", checkUser); 




/*router.post('/profile', requireSignin,(req, res) => {
    res.status(200).json({user: 'profile'})
})*/



module.exports = router;