import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

//@decs Auth user & get token
//@route POST /api/users/login
//@access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email: email,
  });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isProd: user.isProd,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

//@decs Regester a new user
//@route POST /api/users
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({
    email: email,
  });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isProd: user.isProd,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});
//@decs Regester a new user
//@route POST /api/users
//@access Public

const registerUserProd = asyncHandler(async (req, res) => {
  const {
    name,
    companyName,
    companyAddress: { address, city, postalCode, country },
    numSiret,
    email,
    password,
  } = req.body;
  const userExists = await User.findOne({
    email: email,
  });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    companyName,
    companyAddress: {
      address,
      city,
      postalCode,
      country,
    },
    password,
    numSiret,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      companyName: user.companyName,
      companyAddress: user.companyAddress,
      numSiret: user.numSiret,
      isAdmin: user.isAdmin,
      isProd: user.isProd,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});
//@decs Get user profile
//@route GET /api/users/profile
//@access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isProd: user.isProd,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
export { authUser, getUserProfile, registerUser };
