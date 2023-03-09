import { body } from 'express-validator';

export const createCategorySchema = [
  body('name').isLength({ min: 4 }).isString(),
  body('description').isLength({ min: 6 }).isString(),
];
