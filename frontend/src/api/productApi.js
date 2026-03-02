import axios from "axios";

const API = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const fetchProducts = () => API.get("/products");
