import axios from 'axios'
import store from '@/store'
//import { localStorageAvailable } from '@/misc/helpers'

const API_INSTANCE = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
})
API_INSTANCE.interceptors.request.use(
  config => {
    const authToken = GET_STORED_CREDENTIALS()
    if (authToken === '') {
      return {
        headers: {},
        method: config.method,
        url: ''
      }
    }
    config.headers['Authorization'] = `Bearer ${authToken}`
    return config
  },
  error => Promise.reject(error)
)
const GET_STORED_CREDENTIALS = () => {
  const authToken = store.getters['authentication/getAccessToken']
  return authToken
}

export default API_INSTANCE
