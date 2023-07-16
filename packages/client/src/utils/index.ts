import { CONSTANTS } from '@hapi/common'
import { nanoid } from 'nanoid'

export const getAccessToken = () => {
  const token = localStorage.getItem(CONSTANTS.ACCESS_TOKEN_KEY)
  if (!token) {
    const token = `access_token: ${nanoid()}`
    localStorage.setItem(CONSTANTS.ACCESS_TOKEN_KEY, token)
  }
  return token
}
