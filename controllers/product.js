import asyncHandler from 'express-async-handler';
import Product from '../models/product.js';

export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).limit(12);

  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: 'Product not found!' });
  }
});

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const createProduct = asyncHandler(async (req, res) => {
  const { name, category, price, brand, description, images } = req.body;

  const product = await Product.create({
    name,
    category,
    price,
    brand,
    description,
    images,
    user: req.user._id,
  });

  if (product) {
    res.status(201).json({ message: 'product has beeen creates' });
  } else {
    res.status(400).json({ message: 'something went wrong please try again' });
  }
});



export const getCarouselProducts = asyncHandler(async (req, res) => {
  const products = await Product.aggregate([{ $sample: { size: 3 } }]).exec();

  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: 'products not found!' });
  }
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'product not found!' });
  }
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, price, brand, description, images } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) return res.status(404).json({ message: 'product not found!' });

  product.name = name;
  product.category = category;
  product.price = price;
  product.brand = brand;
  product.description = description;
  product.images = images;

  const updatedProduct = await product.save();
  res.status(200).json(updatedProduct);
});

export const updateActiveProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) return res.status(404).json({ message: 'product not found!' });

  product.isActive = req.body.isActive;

  const updatedProduct = await product.save();
  res.status(200).json(updatedProduct);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.status(200).json({ message: 'product has been deleted' });
  } else {
    res.status(404).json({ message: 'product not found!' });
  }
});
