import express from 'express';
import {
  createProduct,
  deleteProduct,
  getCarouselProducts,
  getFeaturedProducts,
  getProductById,
  updateProduct,
} from '../controllers/product.js';
import { admin, auth } from '../middleware/permission.js';
import validation from '../utils/validation/index.js';
import { createProductSchema } from '../utils/validation/product.js';

const router = express.Router();

router
  .route('/')
  .post(auth, admin, createProductSchema, validation, createProduct)
router.route('/featured').get(getFeaturedProducts);
router.route('/carousel').get(getCarouselProducts);

router
  .route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
