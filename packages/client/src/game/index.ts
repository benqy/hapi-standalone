import { Client } from 'colyseus.js'
import { RoomState, CONSTANTS } from '@hapi/common'
import { getAccessToken } from '@/utils'
import { Character } from '@hapi/common/entities'
import { Userinfo } from '@hapi/common/state'
import { Actions } from './actions'
export * from './game'
const F = CONSTANTS.F


export const enterGame = async () => {
  const client = new Client(CONSTANTS.SOCKET_URL)
  const room = await client.joinOrCreate<RoomState.Game>(CONSTANTS.ROOM_GAME, {
    accessToken: getAccessToken()
  })
  room.send('type', 'client to server message')
  room.onStateChange((state) => {
    console.log('onStateChange', state)
  })
  room.onMessage<Character>(F.G_Character_Data, (character) => {
    Actions.G_Character_Data(character)
  })
  room.onMessage<Userinfo>(F.G_JOIN, (userinfo) => {
    console.log('加入游戏房间成功', userinfo)
    // userinfo.doAction()
  })
  console.log('game', room)
}