import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import { unlink } from 'fs';

export const getUsersList = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = req.query.page || 1;
  const { query } = req.query;

  const queryFilter =
    query && query !== 'all'
      ? {
          username: {
            $regex: query,
            $options: 'i',
          },
        }
      : {};

  const users = await User.find({
    ...queryFilter,
  })
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countUsers = await User.countDocuments({
    ...queryFilter,
  });

  res.status(200).json({
    countUsers,
    users,
    page,
    pages: Math.ceil(countUsers / pageSize),
  });
});

export const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  const user = await User.create({
    username,
    email,
    password,
    role,
  });

  if (user) {
    res.status(201).json({ message: 'user has beeen creates' });
  } else {
    res.status(400).json({ message: 'something went wrong please try again' });
  }
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'user not found!' });
  }
});

export const saveUserAddress = asyncHandler(async (req, res) => {
  const { shippingAddress } = req.body;
  const user = await User.findById(req.params.id);

  if (user) {
    user.shippingAddress = shippingAddress;
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ message: 'user not found!' });
  }
});

export const updateUserImage = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    const prevImageUrl = user.picture.substring(37);
    //remove the previous image
    unlink(`${process.cwd()}/uploads/images/${prevImageUrl}`, (err) => {
      if (err) console.log(err);
    });
    user.picture = req.body.picture;

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ message: 'user not found!' });
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.status(200).json({ message: 'user has been deleted' });
  } else {
    res.status(404).json({ message: 'user not found!' });
  }
});
