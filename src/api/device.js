import { urlHttp } from './index.js'

export const fetchDevicesApi = async () => {
  const response = await fetch(`${urlHttp}/device`)
  const payload = await response.json()

  if (response.status !== 200 || payload.error) {
    return [payload, null]
  }
  return [null, payload]
}
