import { RoomState, util } from '@hapi/common'
import { cache } from '../db/cache'
import { Userinfo } from '@hapi/common/state/userinfo.state'
export const setUser = (userinfo: Userinfo) => {
  console.log('setUser', userinfo)
  cache.set(userinfo.accessToken, userinfo)
}

export const createUser = (accessToken: string) => {
  const userinfo = new RoomState.Userinfo()
  userinfo.accessToken = accessToken
  userinfo.account = 'user_' + util.id()
  userinfo.nickname = util.randomName()
  return userinfo
}

export const getUser = (accessToken: string): Userinfo | undefined => {
  console.log('getUser', accessToken)
  return cache.get(accessToken)
}

//登录验证（临时）
export const checkAuth = (accessToken: string) => {
  return accessToken.length > 10
}
