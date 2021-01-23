import axios from "axios";

const openApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Cache-Control": "no-store",
  },
});

const secureApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Cache-Control": "no-store",
  },
});

secureApi.interceptors.request.use(
  async (config) => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    const { token } = user;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default { openApi, secureApi };
