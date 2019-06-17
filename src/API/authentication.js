import axios from 'axios'
import API from '@/API'

const API_OAUTH_TOKEN = 'https://angi.phambatrungthanh.com/oauth/token'
const API_USER_INFO = 'https://angi.phambatrungthanh.com/api/v1/user'

const PASSPORT_REQUEST_CREDENTIALS = async ({ username, password }) => {
  try {
    const response = await axios.post(API_OAUTH_TOKEN, {
      grant_type: 'password',
      client_id: process.env.VUE_APP_API_CLIENT_ID,
      client_secret: process.env.VUE_APP_API_CLIENT_SECRET,
      username: username,
      password: password
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}
const PASSPORT_REQUEST_USER_INFO = async () => {
  try {
    const response = await API.get(API_USER_INFO)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// eslint-disable-next-line import/prefer-default-export
export { PASSPORT_REQUEST_CREDENTIALS, PASSPORT_REQUEST_USER_INFO }
