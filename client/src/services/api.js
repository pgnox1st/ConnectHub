import axios from 'axios';

// Base URL points to our backend server port 5000
const API_URL = 'http://localhost:5000/api';

const API = axios.create({ baseURL: API_URL });

// Automatically attach JWT token to every request if user is logged in
API.interceptors.request.use((req) => {
  const profile = localStorage.getItem('profile');
  if (profile) {
    const { token } = JSON.parse(profile);
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// 1. Auth API Endpoints
export const signIn = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/auth/register', formData);

// 2. Chat & User API Endpoints (For upcoming features)
export const fetchChats = () => API.get('/chats');
export const createChat = (userId) => API.post('/chats', { userId });
export const fetchMessages = (chatId) => API.get(`/messages/${chatId}`);
export const sendMessage = (messageData) => API.post('/messages', messageData);
export const searchUsers = (searchQuery) => API.get(`/users?search=${searchQuery}`);

export default API;
