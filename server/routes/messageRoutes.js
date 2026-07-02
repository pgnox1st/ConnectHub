import express from 'express';
import { sendMessage, allMessages } from '../controllers/messageController.js';

const router = express.Router();
const fakeAuth = (req, res, next) => { req.user = { id: req.headers.userid || "60c72b2f9b1d8b2bad6e4a1a" }; next(); };

router.post('/', fakeAuth, sendMessage);
router.get('/:chatId', fakeAuth, allMessages);

export default router;
