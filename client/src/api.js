import axios from "axios";
const API_BASE_URL = "http://localhost:5500/app";

// create base api
export const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});