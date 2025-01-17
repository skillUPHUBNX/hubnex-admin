import axios from "axios";

export const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
