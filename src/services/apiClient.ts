import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'https://api.example.com',
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // eslint-disable-next-line no-console -- fallback for debugging during integration
    console.error('API error', error)
    return Promise.reject(error)
  },
)
