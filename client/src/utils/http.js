import axios from 'axios'
import { Loading } from 'element-ui'

let httpInstance = axios.create()

httpInstance.defaults.baseURL = 'http://154.22.114.12:3000/'
// httpInstance.defaults.baseURL = 'http://localhost:3000/'
httpInstance.defaults.timeout = 5000

httpInstance.formurl = (url, data, config) => {
  return httpInstance.post(url, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    ...config
  })
}

let requests = 0
let loading
//  request拦截器
httpInstance.interceptors.request.use(
  config => {
    console.log(config)
    requests += 1
    loading = Loading.service()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
//  reponse拦截器
httpInstance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      requests--
      if (requests <= 0) {
        loading.close()
      }
      return Promise.resolve(response)
    }
  },
  error => {
    return Promise.reject(error)
  }
)
export default httpInstance
