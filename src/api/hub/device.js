import { urlHttp } from './index.js'

export const fetchDevicesApi = async ({ token }) => {
  const response = await fetch(`${urlHttp}/devices`, {
    headers: {
      authorization: token,
    },
  })
  const payload = await response.json()

  if (response.status !== 200 || payload.error) {
    return [payload, null]
  }
  return [null, payload]
}

export const changeDeviceStatusApi = async ({ deviceId, status, token }) => {
  const response = await fetch(`${urlHttp}/devices/${deviceId}/change-status`, {
    method: 'POST',
    body: JSON.stringify({ status }),
    headers: {
      'Content-Type': 'application/json',
      'authorization': token,
    },
  })
  const payload = await response.json()

  if (response.status !== 200 || payload.error) {
    return [payload, null]
  }
  return [null, payload]
}

export const createDeviceApi = async ({ name, token }) => {
  try {
    const response = await fetch(`${urlHttp}/device`, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      },
    })

    if (response.status !== 200) {
      return ['Error']
    }
    return [null]
  } catch (e) {
    return [e.message]
  }
}

export const deleteDeviceApi = async ({ id, token }) => {
  const response = await fetch(`${urlHttp}/device/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: token,
    },
  })

  if (response.status !== 204) {
    return ['Error', null]
  }
  return [null]
}
