import asyncHandler from 'express-async-handler';
import { Category } from '../models/category.js';

export const getCateogiesList = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
  
    if (categories) {
      res.status(200).json(categories);
    } else {
      res.status(404).json({ message: 'categories not found!' });
    }
  });
  