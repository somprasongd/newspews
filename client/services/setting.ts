import axios from 'axios'
import conf from './config'

export const callApi = (): any => {
  return axios.create({
    baseURL: conf.BASE_API
  })
}