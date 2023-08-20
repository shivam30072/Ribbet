const express = require("express");

const authMiddleware = require("../middleware/authMiddlware");
const {
  accessChat,
  fetchChats,
  createGoupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require("../controllers/chatController");

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, accessChat)
  .get(authMiddleware, fetchChats);
router.route("/group").post(authMiddleware, createGoupChat);
router.route("/rename").put(authMiddleware, renameGroup);
router.route("/groupremove").put(authMiddleware, removeFromGroup);
router.route("/groupadd").put(authMiddleware, addToGroup);

module.exports = router;
