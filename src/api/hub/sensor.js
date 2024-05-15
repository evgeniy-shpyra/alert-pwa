import { urlHttp } from './index.js'

export const fetchSensorsApi = async ({ token }) => {
  const response = await fetch(`${urlHttp}/sensors`, {
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

export const createSensorApi = async ({ name, actionId, token }) => {
  try {
    const response = await fetch(`${urlHttp}/sensor`, {
      method: 'POST',
      body: JSON.stringify({ name, action_id: actionId }),
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

export const deleteSensorApi = async ({ id, token }) => {
  const response = await fetch(`${urlHttp}/sensor/${id}`, {
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
