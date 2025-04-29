import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});
const userData = localStorage.getItem('health_access_user'); 
const user = userData ? JSON.parse(userData) : null;
console.log('Parsed user:', user);

api.interceptors.request.use((config) => {
  const userData = localStorage.getItem('health_access_user'); 
  const user = userData ? JSON.parse(userData) : null;
  console.log('Parsed user:', user);
  if (user) {
    config.headers['Authorization'] = `Bearer ${user.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
