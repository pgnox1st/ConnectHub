import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Route for Registration: /api/auth/register
router.post('/register', registerUser);

// Route for Login: /api/auth/login
router.post('/login', loginUser);

export default router;
