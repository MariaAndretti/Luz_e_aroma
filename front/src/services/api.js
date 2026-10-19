import axios from "axios";

const api = axios.create({
  baseURL: "https://luz-e-aroma.onrender.com"
});

export default api;
