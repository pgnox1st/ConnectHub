import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  messageType: { type: String, enum: ['text', 'image', 'audio', 'file'], default: 'text' },
  content: { type: String, required: true }, // Contains text message or file/audio URL
  audioDuration: { type: String, default: '' }, // For voice messages like 00:12 in your screenshot
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
           
