import mongoose from 'mongoose';

// const SubCategorySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   category: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: 'Category',
//   },
// });

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model('Category', categorySchema);
//export const SubCategory = mongoose.model('SubCategory', SubCategorySchema);
