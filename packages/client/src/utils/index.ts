import { CONSTANTS } from '@hapi/common'
import { nanoid } from 'nanoid'

export const getAccessToken = () => {
  let token = localStorage.getItem(CONSTANTS.ACCESS_TOKEN_KEY)
  if (!token) {
    token = `access_token: ${nanoid()}`
    localStorage.setItem(CONSTANTS.ACCESS_TOKEN_KEY, token)
  }
  return token
}
