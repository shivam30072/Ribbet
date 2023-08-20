const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const authMiddleware = asyncHandler(async (req, res, next) => {
  // extracting token from  req:{headers: {authorization: Bearer token}}
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer")) {
    throw new Error("Authentication Invalid");
  }

  // creating an array of the token string ["bearer", "token"]
  const token = authHeaders.split(" ")[1];

  try {
    // decoded the token
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(user.id).select("-password");
    next();
  } catch (error) {
    throw new Error("Authentication Invalid");
  }
});

module.exports = authMiddleware;
