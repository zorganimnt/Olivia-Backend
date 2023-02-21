import asyncHandler from 'express-async-handler';

//admin
//super admin
//client

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const createProduct = asyncHandler(async (req, res) => {
  console.log({ req, res });
});
