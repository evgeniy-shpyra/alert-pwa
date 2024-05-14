import { urlHttp } from './index.js'

export const fetchDevicesApi = async () => {
  const response = await fetch(`${urlHttp}/devices`)
  const payload = await response.json()

  if (response.status !== 200 || payload.error) {
    return [payload, null]
  }
  return [null, payload]
}

export const changeDeviceStatusApi = async (deviceId, status) => {
  const response = await fetch(`${urlHttp}/devices/${deviceId}/change-status`, {
    method: 'POST',
    body: JSON.stringify({ status }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const payload = await response.json()

  if (response.status !== 200 || payload.error) {
    return [payload, null]
  }
  return [null, payload]
}

export const createDeviceApi = async (name) => {
  try {
    const response = await fetch(`${urlHttp}/device`, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.status !== 200) {
      return ["Error"]
    }
    return [null]
  } catch (e) {
    return [e.message]
  }
}
