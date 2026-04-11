import axios from "axios";

const newRequest = axios.create({
  // Fallback to localhost if the environment variable isn't set
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8800/api/",
  withCredentials: true,
});

export default newRequest;