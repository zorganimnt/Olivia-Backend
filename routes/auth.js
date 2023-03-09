import express from 'express';
import {
  refreshToken,
  userLogin,
  userLogout,
  userRegister,
} from '../controllers/auth.js';
import loginLimiter from '../middleware/limite-loger.js';

import { loginSchema, registerSchema } from '../utils/validation/auth.js';
import validation from '../utils/validation/index.js';

const router = express.Router();

router.route('/register').post(registerSchema, validation, userRegister);
router.route('/login').post(loginSchema, validation, loginLimiter, userLogin);
router.route('/logout').post(userLogout);
router.route('/refresh').post(refreshToken);

export default router;
