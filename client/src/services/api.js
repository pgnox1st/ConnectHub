import axios from "axios";

// Render Backend URL
const API_URL = "https://connecthub-backend-ydqo.onrender.com/api";

const API = axios.create({
  baseURL: API_URL,
});

// Automatically attach JWT token
API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");

  if (profile) {
    const { token } = JSON.parse(profile);
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// ================= AUTH =================

export const signIn = (formData) =>
  API.post("/auth/login", formData);

export const signUp = (formData) =>
  API.post("/auth/register", formData);

// ================= CHAT =================

export const fetchChats = () =>
  API.get("/chats");

export const createChat = (userId) =>
  API.post("/chats", { userId });

export const fetchMessages = (chatId) =>
  API.get(`/messages/${chatId}`);

export const sendMessage = (messageData) =>
  API.post("/messages", messageData);

export const searchUsers = (searchQuery) =>
  API.get(`/users?search=${searchQuery}`);

// ================= AI CHAT =================

export const askAI = (message) =>
  API.post("/chat", { message });

export default API;
