import { urlHttp } from './index.js'

export const fetchSensorsApi = async () => {
  const response = await fetch(`${urlHttp}/sensors`)
  const payload = await response.json()

  if (response.status !== 200 || payload.error) {
    return [payload, null]
  }
  return [null, payload]
}


export const createSensorApi = async ({name, actionId}) => {
  try {
    const response = await fetch(`${urlHttp}/sensor`, {
      method: 'POST',
      body: JSON.stringify({ name, action_id: actionId}),
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