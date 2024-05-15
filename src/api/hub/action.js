import { urlHttp } from '.'

export const createActionApi = async ({ name, token }) => {
  try {
    const response = await fetch(`${urlHttp}/action`, {
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

export const fetchActionsApi = async ({ token }) => {
  const response = await fetch(`${urlHttp}/actions`, {
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

export const deleteActionApi = async ({ id, token }) => {
  const response = await fetch(`${urlHttp}/action/${id}`, {
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
