import { callApi } from './setting'

export const calculateNewsPews = async (data: any): Promise<any> => {
  try {
    if (process.env.NEXT_PUBLIC_USE_GEO === 'true') {
      callApi().post(`/newspews/log`, data.geo).catch((err: any) => err.response)
    }

    const result = window.calScore(JSON.stringify(data))
    if ((result != null) && ('error' in result)) {
      console.log("CalculateNewsPews Go return value", result)
      return {}
    }
    return result
  } catch (err) {
    console.log('calculateNewsPews', err)
  }
}