import { urlHttp } from './index.js'

export const fetchUserApi = async ({ token }) => {
  const response = await fetch(`${urlHttp}/user`, {
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

export const fetchUsersApi = async ({ token }) => {
  const response = await fetch(`${urlHttp}/users`, {
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

export const createUserApi = async ({ login, password, token }) => {
  try {
    const response = await fetch(`${urlHttp}/user`, {
      method: 'POST',
      body: JSON.stringify({ login, password }),
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

export const loginUserApi = async ({ login, password }) => {
  try {
    const response = await fetch(`${urlHttp}/login`, {
      method: 'POST',
      body: JSON.stringify({ login, password }),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    })

    const payload = await response.json()

    if (response.status !== 200 || payload.error) {
      return [payload, null]
    }
    return [null, payload]
  } catch (e) {
    return [e.message]
  }
}


export const deleteUserApi = async ({ id, token }) => {
  const response = await fetch(`${urlHttp}/user/${id}`, {
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
