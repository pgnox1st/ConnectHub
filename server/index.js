import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes Links
app.use('/api/auth', authRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/connecthub')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('Database connection error: ', err));

// Basic Route for Testing
app.get('/', (req, res) => {
  res.send('ConnectHub Premium Backend Server is Running!');
});

// Create HTTP Server for Socket.io
const server = http.createServer(app);

// Initialize Socket.io for Real-time Chat
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

// Socket.io Connection Logic
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join_chat', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop_typing', (room) => socket.in(room).emit('stop_typing'));

  socket.on('new_message', (newMessageReceived) => {
    var chat = newMessageReceived.chatId;
    if (!chat.participants) return console.log('chat.participants not defined');

    chat.participants.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;
      socket.in(user._id).emit('message_received', newMessageReceived);
    });
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start Server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
      
