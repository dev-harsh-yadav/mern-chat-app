const express = require("express");
const path = require("path");
const authController = require(path.join(
  __dirname,
  "./../controllers/auth-controllers"
));
const chatController = require(path.join(
  __dirname,
  "./../controllers/chat-controllers"
));

const router = express.Router();

router.use(authController.protect);

router
  .route("/:id")
  .get(chatController.getChat)
  .delete(chatController.deleteChat);

// TODO: get all chats+groups of a active user sorted by latestMesage

module.exports = router;
