import { callApi } from './setting'

export const calculateNewsPews = async (data: any): Promise<any> => {
  try {
    if (process.env.NEXT_PUBLIC_USE_GEO === 'true') {
      callApi().post(`/newspews/log`, data.geo).catch((err: any) => err.response)
    }

    const result = window.calScore(JSON.stringify(data))
    const json = JSON.parse(result)
    if ((json != null) && ('error' in json)) {
      console.log("CalculateNewsPews Go return value", json)
      return {}
    }
    return json
  } catch (err) {
    console.log('calculateNewsPews', err)
  }
}