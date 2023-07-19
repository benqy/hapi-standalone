import { Client } from 'colyseus.js'
import { CONSTANTS } from '@hapi/common'
import { getAccessToken } from '@/utils'
import type { Userinfo } from '@hapi/common/state'
import { actions } from './actions'
export const loadUserInfo = async () => {
  const client = new Client(CONSTANTS.SOCKET_URL)
  try {
    const room = await client.joinOrCreate(CONSTANTS.ROOM_AUTH, {
      accessToken: getAccessToken()
    })
    room.onMessage('*', () => {})
    room.onMessage<Userinfo>(CONSTANTS.F.AUTH_JOIN, (userinfo: Userinfo) => {
      console.log('登录成功:', userinfo.accessToken)
      actions.AUTH_JOIN(userinfo)
      room.leave()
    })
  } catch (ex: any) {
    if (ex.code === 4215) {
      alert('登录失败，服务器调整中')
    } else {
      alert(ex.message)
    }
  }
}
