import { urlHttp } from '.'

export const fetchWifiNetworksApi = async () => {
  try {
    const response = await fetch(`${urlHttp}`)
    const payload = await response.json()

    if (response.status !== 200 || payload.error) {
      return [payload, null]
    }
    return [null, payload]
  } catch (e) {
    return [e.message]
  }
}
export const saveAgentConfigApi = async (body) => {
  try {
    const response = await fetch(`${urlHttp}/save`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json',
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
