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
