import axios, { AxiosError } from 'axios'

import type { ErrorResponse } from '../types/app'
import { clearStore } from '../utils'
import { config } from "../lib";

export const apiInstance = axios.create({
  baseURL: config.BASE_URL,
})

const handleErrors = async (error: AxiosError): Promise<string> => {
  if (error.response) {
    const response = error.response?.data as ErrorResponse
    if (response?.errors) return JSON.stringify(response.errors)
    if (response?.data) return JSON.stringify(response.data)
    if (response?.message) return response.message

  }
  return JSON.stringify({
    message: 'An unknown error occurred',
    errors: {
      message: ['An unknown error occurred'],
    },
  })
}

apiInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('accessToken')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      clearStore()
      window.location.href = '/login'

      if (error instanceof AxiosError) {
        throw new Error(error.message)
      } else {
        throw new Error('Session expired, please log in again')
      }
    }

    throw new Error(await handleErrors(error))
  },
)
