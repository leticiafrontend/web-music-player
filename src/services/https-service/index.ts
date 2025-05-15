import axios, { type AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

export const callApi = (url: string, config?: AxiosRequestConfig) => {
  try {
    const response = instance.get(url, config)
    return response
  } catch (error) {
    console.log(error)
  }
}
