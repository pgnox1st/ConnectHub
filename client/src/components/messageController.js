import Message from '../models/Message.js';
import Chat from '../models/Chat.js';

// Send a new message (Text, audio or file)
export const sendMessage = async (req, res) => {
  const { content, chatId, messageType, audioDuration } = req.body;

  if (!content || !chatId) {
    return res.status(400).json({ message: "Invalid data passed into request" });
  }

  var newMessage = {
    sender: req.user.id,
    content: content,
    chatId: chatId,
    messageType: messageType || 'text',
    audioDuration: audioDuration || ''
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "username avatar");
    message = await message.populate("chatId");
    message = await Chat.populate(message, {
      path: "chatId.participants",
      select: "username avatar email",
    });

    // Update the latest message in Chat Schema
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all messages for a specific Chat room
export const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId })
      .populate("sender", "username avatar email")
      .populate("chatId");
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
