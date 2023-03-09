import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import generateToken, { getUserInfo } from '../utils/helper/auth.js';
import jwt from 'jsonwebtoken';

//admin
//super admin
//client

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const userRegister = asyncHandler(async (req, res) => {
  const { username, email, password, phone } = req.body;

  const existUser = await User.findOne({ email });

  if (existUser)
    return res.status(400).json({ message: 'Email Already Exist!' });

  const newUser = await User.create({
    username,
    phone,
    email,
    password,
  });

  if (newUser) {
    res.status(201).json({ message: 'user has been created successfully' });
  } else {
    res.status(500);
    throw new Error('something went wrong please try again!');
  }
});

// @desc    login user account
// @route   post /api/auth/login
// @access  public
export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: 'email does not exist' });

  if (user && (await user.comparePassword(password))) {
    const userInfo = getUserInfo(user);

    const token = generateToken({
      userInfo,
      key: process.env.ACCESS_TOKEN_SECRET,
      time: '2h',
    });

    const refreshToken = generateToken({
      userInfo,
      key: process.env.REFRESH_TOKEN_SECRET,
      time: '2d',
    });

    res.cookie('token', refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https,
      sameSite: 'None', //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    res.status(200).json({
      token,
    });
  } else {
    res.status(401).json({ message: 'Wrong Credentials' });
  }
});

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const adminLogin = asyncHandler(async (req, res) => {
  console.log({ req, res });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private/Cookies
export const userLogout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.token) {
    res.status(204);
    throw new Error('no cookies');
  }
  res.clearCookie('token', { httpOnly: true, sameSite: 'none', secure: true });
  res.json({ message: 'Cookie cleared' });
});

// @desc    refresh user token
// @route   POST /api/auth/refresh
// @access  Private/Cookies
export const refreshToken = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies.token) {
    res.status(401);
    throw new Error('Unauthorized no token!');
  }

  const refreshToken = cookies.token;

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  const user = await User.findById(decoded.userInfo._id);

  if (!user) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  const accessToken = generateToken({
    userInfo: getUserInfo(user),
    key: process.env.ACCESS_TOKEN_SECRET,
    time: '2h',
  });

  res.status(200).json({
    token: accessToken,
  });
});
