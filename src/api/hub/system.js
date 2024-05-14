import { urlHttp } from '.'

export const pingSystemApi = async () => {
  const response = await fetch(`${urlHttp}/system/ping`)

  if (response.status !== 200) {
    return ['Error', null]
  }
  return [null]
}
