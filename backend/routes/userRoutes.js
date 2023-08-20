const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddlware");

const router = express.Router();

router.route("/register").post(registerUser);
router.post("/login", loginUser);
router.route("/").get(authMiddleware, getAllUsers);

module.exports = router;
