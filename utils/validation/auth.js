import { body } from 'express-validator';

export const registerSchema = [
  body('username').isLength({ min: 4, max: 20 }).isString(),
  // body('address').isLength({ min: 4, max: 20 }).isString(),
  // body('phone').isLength({ min: 8, max: 11 }).isString(),
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 50 }).isString(),
];

export const loginSchema = [
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 25 }).isString(),
];
