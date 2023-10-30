const path = require("path");
const Chat = require(path.join(__dirname, "./../models/chat-model.js"));
const catchAsync = require(path.join(__dirname, "./../utils/catch-async"));
const AppError = require(path.join(__dirname, "./../utils/app-error"));

exports.getChat = catchAsync(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id)
    .populate({
      path: "latestMessage",
      select: "sender content reciever",
      populate: {
        path: "sender reciever",
        select: "name email pic",
      },
    })
    .populate({
      path: "users",
      select: "name email pic",
    });
  if (!chat) {
    return next(new AppError("Chat not found", 404));
  }

  return res.status(200).json({
    status: "success",
    message: "Chat found",
    data: { chat },
  });
});

exports.getAllRecentChats = catchAsync(async (req, res, next) => {
  let recentChats = await Chat.find({ users: req.user._id })
    .populate({
      path: "users",
      select: "name pic",
    })
    .populate({
      path: "latestMessage",
      select: "content sender createdAt",
      populate: { path: "sender", select: "name" },
    });

  recentChats = recentChats
    .map((chat) => {
      return {
        user: chat.users.filter((user) => user._id !== req.user._id)[0],
        latestMessage: {
          content: chat.latestMessage?.content,
          senderName:
            chat.latestMessage?.sender.name === req.user.name
              ? "You"
              : chat.latestMessage?.sender.name,
          time: chat.latestMessage?.createdAt,
        },
      };
    })
    .sort(
      (a, b) =>
        new Date(b.latestMessage.time).getTime() -
        new Date(a.latestMessage.time).getTime()
    );

  res.status(200).json({
    status: "success",
    message: "Recent Chats",
    result: recentChats.length,
    data: { recentChats },
  });
});
