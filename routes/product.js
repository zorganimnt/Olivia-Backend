const express = require('express');
const { createProduct, getProductDetailsById } = require('../controllers/product');
const { requireSignin, sellerMiddleware } = require('../middlewares/permissions/permission');
const multer = require('multer');
const router = express.Router();
const path = require ('path');
const shortid = require ('shortid');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  });
  const upload = multer ({storage});

router.post('/product/createPro',requireSignin,sellerMiddleware,upload.array('productPicture'),createProduct);
router.get('/product/getByID',requireSignin,sellerMiddleware,getProductDetailsById);




module.exports = router;