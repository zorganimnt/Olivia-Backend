import express from 'express';
import authRoutes from './auth.js';
import productRoutes from './product.js';
import categoryRoutes from './category.js';
import userRoutes from './user.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/users', userRoutes);
export default router;
