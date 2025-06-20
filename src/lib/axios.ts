import axios from "axios"
import { toast } from "react-toastify"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://node.hostingladz.com:3837/",
  // Remove the default Content-Type header to allow dynamic setting
})

api.interceptors.request.use(
  async (config) => {
    let userData = localStorage.getItem("health_access_user")
    let user = userData ? JSON.parse(userData) : null
    
 

    if (user) {
      config.headers["Authorization"] = `Bearer ${user.token}`
    }

    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json"
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// api.interceptors.response.use(
//   (response) => {
//     // Check if session expired from response data
//     if (response.data?.data?.statusCode === 401 || response.data?.data?.statusCode === 403) {
//       // Clear all auth related data
//       localStorage.clear() // Clear localStorage
//       // Clear cookies using Next.js API
//       fetch('/api/clear-user-cookie', {
//         method: 'POST',
//       }).then(() => {
//         window.location.href = "/login"
//         toast.error("Session expired. Please login again.")
//       })
//       return Promise.reject(response)
//     }
//     return response
//   },
//   (error) => {
//     // Handle session expiry in error responses
//     if (error.response?.status === 401 || error.response?.status === 403) {
//       // Clear all auth related data
//       localStorage.clear() // Clear localStorage
//       // Clear cookies using Next.js API
//       fetch('/api/clear-user-cookie', {
//         method: 'POST',
//       }).then(() => {
//         window.location.href = "/login"
//         toast.error("Session expired. Please login again.")
//       })
//     }
//     return Promise.reject(error)
//   },
// )

export default api
