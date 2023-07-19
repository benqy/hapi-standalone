import { Scene } from './scene'

import { RoomState, CONSTANTS } from '@hapi/common'
import { getAccessToken } from '@/utils'
import { Character } from '@hapi/common/entities'
import { actions } from './actions'
import { client } from './client'
import { Room } from 'colyseus.js'
import { core } from '@hapi/common'
export * from './game'
const F = CONSTANTS.F


export const game = {
  scene: new Scene(),
  //引用的scene.player.value
  get player() {
    return this.scene.player.value
  },
  c: core.getClientController(),
  //引用的scene.player.value.character
  get character(): Character {
    return this.scene.player.value.character
  },
  //引用的scene.player.value.character.inventory
  get inventory() {
    return this.scene.player.value.character.inventory
  },
  room: null as Room<RoomState.Game> | null,
  async enterRoom() {
    const room = await client.create<RoomState.Game>(CONSTANTS.ROOM_GAME, {
      accessToken: getAccessToken()
    })
    game.room = room
    this.bindMessage(room)
  },
  bindMessage(room: Room<RoomState.Game>) {
    room.onMessage('*', () => {})
    room.onMessage<Character>(F.G_Character_Data, (character) => {
      // console.log(JSON.stringify(character),123)
      actions.G_Character_Data(character)
    })
    // room.onMessage<Userinfo>(F.G_JOIN, (userinfo) => {
    //   console.log('加入游戏房间成功', userinfo)
    //   // userinfo.doAction()
    // })
    console.log('game', room)
  }
}
