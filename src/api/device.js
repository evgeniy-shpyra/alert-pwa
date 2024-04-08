import { url } from './index.js'

export const fetchDevicesApi = async () => {
  const response = await fetch(`${url}/device`)
  const payload = await response.json()

  if (response.status !== 200 || payload.error) {
    return [payload, null]
  }
  return [null, payload]
}
