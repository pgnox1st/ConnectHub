import Chat from '../models/Chat.js';
import User from '../models/User.js';

// Create or fetch a 1-to-1 Chat
export const accessChat = async (req, res) => {
  const { userId } = req.body; // The user we want to chat with

  if (!userId) return res.status(400).json({ message: "UserId param not sent with request" });

  try {
    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { participants: { $elemMatch: { $eq: req.user.id } } },
        { participants: { $elemMatch: { $eq: userId } } },
      ],
    }).populate("participants", "-password").populate("latestMessage");

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        participants: [req.user.id, userId],
      };
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate("participants", "-password");
      res.status(200).json(FullChat);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch all chats for the logged-in user (Screenshot left list mechanism)
export const fetchChats = async (req, res) => {
  try {
    Chat.find({ participants: { $elemMatch: { $eq: req.user.id } } })
      .populate("participants", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "username avatar email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
        
