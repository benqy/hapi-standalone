import { ref } from 'vue'
import { Scene } from './scene'
import { Player } from '@hapi/common/entities'
import { Client } from 'colyseus.js'
import { RoomState, CONSTANTS } from '@hapi/common'
import { getAccessToken } from '@/utils'
import { Character } from '@hapi/common/entities'
import { Userinfo } from '@hapi/common/state'
import { Actions } from './actions'
export * from './game'
const F = CONSTANTS.F

export const game = {
  scene: new Scene(),
  async enterRoom() {
    const client = new Client(CONSTANTS.SOCKET_URL)
    const room = await client.create<RoomState.Game>(CONSTANTS.ROOM_GAME, {
      accessToken: getAccessToken()
    })
    room.onMessage('*', () => {})
    room.onMessage<Character>(F.G_Character_Data, (character) => {
      Actions.G_Character_Data(character)
    })
    room.onMessage<Userinfo>(F.G_JOIN, (userinfo) => {
      console.log('加入游戏房间成功', userinfo)
      // userinfo.doAction()
    })
    // room.onMessage('__playground_message_types', (message) => {
    //   // console.log(message, 1)
    // })
    console.log('game', room)
  }
}
