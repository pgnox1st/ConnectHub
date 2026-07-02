import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Basic route to check server
app.get('/', (req, res) => {
  res.send('ConnectHub Backend is working perfectly!');
});

// Socket logic
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('disconnect', () => console.log('User disconnected'));
});

// Database and Server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database Connected');
    httpServer.listen(process.env.PORT || 5000, () => {
      console.log('Server is running');
    });
  })
  .catch((err) => console.log(err));
