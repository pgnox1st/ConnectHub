import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route for Testing
app.get('/', (req, res) => {
  res.send('ConnectHub Backend Server is Running successfully!');
});

// Create HTTP Server for Socket.io
const server = http.createServer(app);

// Initialize Socket.io for Real-time Chat
const io = new Server(server, {
  cors: {
    origin: '*', // Allows connection from frontend
    methods: ['GET', 'POST']
  }
});

// Socket.io Connection Logic
io.on('connection', (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // When a user sends a message
  socket.on('send_message', (data) => {
    // Broadcast message to everyone else
    socket.broadcast.emit('receive_message', data);
  });

  // When a user disconnects
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start Server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
