import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config

    if (error.response?.status !== 401) return Promise.reject(error)
    if (originalRequest._retry) return Promise.reject(error)
    if (originalRequest.url.inclues("/auth/token/refresh")) return Promise.reject(error)
    
    originalRequest._retry = true

    try {
      await api.post("/auth/token/refresh")
      return api(originalRequest)
    } catch (refreshError) {
      console.log("Refresh token expired")
      return Promise.reject(refreshError)
    }
  }
)

export default api;