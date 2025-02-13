const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require("../controllers/chatControllers");

const router = express.Router();

// api/chat/
router.route("/").post(protect, accessChat);

router.route("/").get(protect, fetchChats);

router.route("/group").post(protect, createGroupChat);

// router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);

router.route("/groupremove").put(protect, removeFromGroup);

router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
