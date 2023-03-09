import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const auth = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith('Bearer')) {
    const token = authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.userInfo._id);

    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// only user within admin role have access
export const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(401);
    throw new Error("Non autorisé, pas d'administrateur");
  }
});
