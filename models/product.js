import mongoose, { Schema } from 'mongoose';

export const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    images: [{ type: String, required: true }],
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// const ClothesSchema = new mongoose.Schema({
//   colors: [String],
//   sizes: [
//     {
//       name: { type: String },
//       inStock: { type: Boolean, default: true },
//     },
//   ],
// });

// const ComputerSchema = new mongoose.Schema({
//   specifications: {
//     type: String,
//     required: true,
//   },
// });

const Product = mongoose.model('Product', productSchema);
// export const Clothes = Product.discriminator('Clothes', ClothesSchema);
// export const Computer = Product.discriminator('Computer', ComputerSchema);

export default Product;
