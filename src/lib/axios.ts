import axios from 'axios'
import { API_BASE_URL, ENDPOINTS } from '@/configs/constant'
import { useAuthStore } from '@/store/authStore'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const res = await axios.post(
          `${API_BASE_URL}${ENDPOINTS.REFRESH}`,
          {},
          { withCredentials: true },
        )

        useAuthStore.setState({ accessToken: res.data.accessToken })

        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        useAuthStore.getState().logout()
      }
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
