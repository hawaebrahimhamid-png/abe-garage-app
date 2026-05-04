import axios from "axios";

// create base connection to backend
const api = axios.create({
  baseURL: "https://abe-garage-app-backend.onrender.com/api",
});

// 🔐 automatically attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
