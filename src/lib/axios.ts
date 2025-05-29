import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://node.hostingladz.com:3837/",
  // Remove the default Content-Type header to allow dynamic setting
})

console.log("Axios Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL)

api.interceptors.request.use(
  (config) => {
    const userData = localStorage.getItem("health_access_user")
    const user = userData ? JSON.parse(userData) : null
    console.log("Parsed user:", user)

    if (user) {
      config.headers["Authorization"] = `Bearer ${user.token}`
    }

    // Only set Content-Type to application/json if it's not FormData
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json"
    }
    // For FormData, let axios set the Content-Type automatically with boundary

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api
