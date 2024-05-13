import { urlHttp } from '.'

export const fetchActionsApi = async () => {
  const response = await fetch(`${urlHttp}/actions`)
  const payload = await response.json()

  if (response.status !== 200 || payload.error) {
    return [payload, null]
  }
  return [null, payload]
}
