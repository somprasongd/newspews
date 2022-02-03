import { callApi } from './setting'

export const calculateNewsPews = async (data: any): Promise<any> => {
  try {
    const response = await callApi().post(`/newspews`, data).catch((err: any) => err.response)
    return response
  } catch (err) {
    console.log('calculateNewsPews', err)
  }
}