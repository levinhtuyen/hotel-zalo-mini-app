import axios from 'axios'

const apiCaller = axios.create({
  baseURL: import.meta.env.VITE_APP_WEB_BOOKING_V5,
  // timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Device-Encode': '88153480-3ab7-11ec-8a68-d7fd852ead77'
    
  }
})
// req
apiCaller.interceptors.request.use(function (config) {
  const token = localStorage.getItem('access_token')

  if (token) {
    config.headers.Authorization = ``
    config.headers.Localization = 'vi'
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
export default apiCaller