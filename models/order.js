import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
