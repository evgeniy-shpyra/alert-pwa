import { urlHttp } from '.'

export const pingSystemApi = async ({ token }) => {
  const response = await fetch(`${urlHttp}/system/ping`, {
    headers: { authorization: token },
  })

  if (response.status !== 200) {
    return ['Error', null]
  }
  return [null]
}

export const fetchSystemStatusApi = async ({ token }) => {
  const response = await fetch(`${urlHttp}/system/status`, {
    headers: { authorization: token },
  })

  const payload = await response.json()

  if (response.status !== 200 || payload.error) {
    return [payload, null]
  }
  return [null, payload]
}
export const changeSystemStatusApi = async ({ status, token }) => {
  console.log({ status, token })
  const response = await fetch(`${urlHttp}/system/status`, {
    headers: { 'authorization': token, 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify({ status }),
  })

  if (response.status !== 200) {
    return ['Error', null]
  }
  return [null]
}
