import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    shippingAddress: {
      address: { type: String },
      city: { type: String },
      phone: {
        type: String,
      },
      postalCode: { type: String },
      country: { type: String, default: 'Tunisia' },
    },

    picture: {
      type: String,
      default:
        'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png',
    },
    role: {
      type: String,
      required: true,
      default: 'Customer',
      of: ['Customer', 'Seller', 'Admin'],
    },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
