import axios from 'axios'
export const baseUrl =
  import.meta.env.VITE_R3S_API || 'https://slica-r3s-api.isoftplus.co.th/api/'
const axiosClient = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
})

axiosClient.interceptors.request.use(
  request => {
    const token = localStorage.getItem('token')
    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    }
    return request
  },
  error => Promise.reject(error)
)

axiosClient.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      if (window.location.pathname !== '/login') {
        window.location.replace('/login')
      }
    }
    return Promise.reject(error)
  }
)

export default axiosClient
