import { urlHttp } from './index.js'

export const fetchSensorsApi = async () => {
  const response = await fetch(`${urlHttp}/sensors`)
  const payload = await response.json()

  if (response.status !== 200 || payload.error) {
    return [payload, null]
  }
  return [null, payload]
}
