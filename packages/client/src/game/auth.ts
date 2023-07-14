import { Client } from 'colyseus.js'
import { RoomState, CONSTANTS } from '@hapi/common'
import { getAccessToken } from '@/utils'

export const loadUserInfo = async () => {
  const client = new Client(CONSTANTS.SOCKET_URL)
  try {
    const res = await client.joinOrCreate<RoomState.UserRoomState>('auth_room', {
      accessToken: getAccessToken()
    })
    console.log('auth',res)
    return res
  } catch (ex:any) {
    if(ex.code === 4215){
      alert('登录失败，服务器调整中')
    }else {
      alert(ex.message)
    }
  }
  
}
