import { CONSTANTS } from '@hapi/common'

export const uuidV4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const getAccessToken = () => {
  const token = localStorage.getItem(CONSTANTS.ACCESS_TOKEN_KEY)
  if (!token) {
    const token = `access_token: ${uuidV4()}`
    localStorage.setItem(CONSTANTS.ACCESS_TOKEN_KEY, token)
  }
  return token
}
