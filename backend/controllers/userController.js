const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const { generateToken } = require("../db/jwtToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please enter all the fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const userDetails = {
    name,
    email,
    password,
    pic,
  };

  const user = await User.create(userDetails);
  if (user) {
    const token = generateToken(user._id, user.email);

    res.status(201).json({ user, token });
  } else {
    res.status(400);
    throw new Error("Failed to create a user");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("please enter all the fields");
  }

  const user = await User.findOne({ email });

  if (user) {
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      res.status(400);
      throw new Error("Incorrect Password");
    }
    const token = generateToken(user._id, user.email);

    res.status(200).json({ user, token });
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { registerUser, loginUser, getAllUsers };
