import express from 'express';
import { accessChat, fetchChats } from '../controllers/chatController.js';

const router = express.Router();

// Assuming your authMiddleware is built or will be skipped temporarily
const fakeAuth = (req, res, next) => { req.user = { id: req.headers.userid || "60c72b2f9b1d8b2bad6e4a1a" }; next(); };

router.post('/', fakeAuth, accessChat);
router.get('/', fakeAuth, fetchChats);

export default router;
