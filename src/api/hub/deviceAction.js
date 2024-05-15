import { urlHttp } from '.'

export const fetchDevicesActionsApi = async ({ token }) => {
  const response = await fetch(`${urlHttp}/devices-actions`, {
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

export const bulkUpdateDevicesActionsApi = async ({
  devicesActions,
  token,
}) => {
  const response = await fetch(`${urlHttp}/devices-actions`, {
    method: 'PUT',
    body: JSON.stringify(devicesActions),
    headers: {
      'Content-Type': 'application/json',
      'authorization': token,
    },
  })

  if (response.status !== 200) {
    return ['Error']
  }
  return [null]
}
