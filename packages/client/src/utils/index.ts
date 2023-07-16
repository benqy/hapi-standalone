import { CONSTANTS, util } from '@hapi/common'

export const getAccessToken = () => {
  const token = localStorage.getItem(CONSTANTS.ACCESS_TOKEN_KEY)
  if (!token) {
    const token = `access_token: ${util.uuidV4()}`
    localStorage.setItem(CONSTANTS.ACCESS_TOKEN_KEY, token)
  }
  return token
}
