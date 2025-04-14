import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;

export const apiDadata = axios.create({
  baseURL: import.meta.env.VITE_DADATA_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Token ${import.meta.env.VITE_DADATA_API_KEY}`,
  }
})
