import Axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'
import { AppConfig } from './AppConfig'
import { showToast } from '../Utils/Utility'
import { ToastType } from '../Utils/Const'
import Loader from '../Utils/AppLoader'
let isToastShown = true

const axiosInstance = Axios.create({
  baseURL: AppConfig.baseUrl,
})

const getFormData = (object: { [key: string]: any }) => {
  const formData = new FormData()
  Object.keys(object).forEach((key) => {
    if (object[key] !== undefined && object[key] !== null && object[key] !== '') {
      if (Array.isArray(object[key])) {
        object[key].forEach((item: any) => {
          formData.append(key, item)
        })
      } else {
        formData.append(key, object[key])
      }
    }
  })
  return formData
}

axiosInstance.interceptors.request.use(
  async (config) => {
    console.log(`axios request : ${config?.url} =>`, config)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  async (response) => {
    console.log(
      `<= Response : ${response?.config?.url} : Status - ${response?.status} `,
      response.data,
    )
    Loader.isLoading(false)
    return Promise.resolve(response)
  },
  async (error) => {
    console.log(
      `<== Response Error : ${error?.config?.url} : Status - ${error?.status} `,
      error.response,
    )

    if (error?.response?.data?.error) {
      isToastShown && showToast(ToastType.error, error?.response?.data?.error?.join(', '))
    } else if (error?.response?.data?.message) {
      isToastShown && showToast(ToastType.error, error?.response?.data?.message)
    } else {
      isToastShown && showToast(ToastType.error, 'Something went wrong')
    }
    Loader.isLoading(false)
    return Promise.reject(error)
  },
)

export interface APICallParams {
  method?: 'get' | 'post' | 'put' | 'delete'
  payload?: any
  url: string
  headers?: AxiosRequestHeaders
  removeLoader?: boolean
  formData?: boolean
  removeToast?: boolean
}

const APICall = async <T>({
  method = 'post',
  payload = null,
  url = '',
  removeLoader = false,
  formData = false,
  removeToast = false,
}: APICallParams): Promise<AxiosResponse<T>> => {
  if (!removeLoader) {
    Loader.isLoading(true)
  }
  isToastShown = !removeToast

  const config: AxiosRequestConfig = {
    method: method.toLowerCase(),
    url,
    headers: {
      'Content-Type': formData ? 'multipart/form-data' : 'application/json',
    },
  }

  if (payload && method.toLowerCase() === 'get') {
    config.params = payload
  } else if (payload && (method.toLowerCase() === 'post' || method.toLowerCase() === 'put')) {
    if (formData) {
      config.data = getFormData(payload)
    } else {
      config.data = payload
    }
  }
  console.log('API details: ', method, payload, url)

  return new Promise((resolve, reject) => {
    axiosInstance(config)
      .then((res) => {
        if (res.status.toString().startsWith('2')) {
          resolve(res)
        } else {
          reject(res)
        }
      })
      .catch((error) => {
        if (error) {
          reject(error.response)
        }
        reject({
          statusCode: 500,
          data: { message: error.message ?? error.error ?? 'Something went wrong!' },
        })
      })
  })
}

export default APICall
