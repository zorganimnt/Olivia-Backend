import { body } from 'express-validator';

export const createProductSchema = [
  body('name').isLength({ min: 4 }).isString(),
  body('brand').isLength({ min: 2 }).isString(),
  body('category').isString(),
  body('price').isNumeric(),
  body('description').isLength({ min: 6 }).isString(),
];
