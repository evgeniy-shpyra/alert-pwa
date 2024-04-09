import { urlHttp } from './index.js'

export const fetchUserApi = async () => {
  const response = await fetch(`${urlHttp}/getUser`)
  const payload = await response.json()

  if (response.status !== 200 || payload.error) {
    return [payload, null]
  }
  return [null, payload]
}