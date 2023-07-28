import { Scene } from './scene'

import { RoomState, CONSTANTS } from '@hapi/common'
import { getAccessToken } from '@/utils'
import { Character, GameMap } from '@hapi/common/entities'
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
    try {
      const room = await client.create<RoomState.Game>(CONSTANTS.ROOM_GAME, {
        accessToken: getAccessToken()
      })
      game.room = room
      this.bindMessage(room)
    } catch (ex) {
      console.log('创建游戏失败,请重试')
    }
    // this.startCombat()
  },
  bindMessage(room: Room<RoomState.Game>) {
    room.onStateChange(() => {
      // console.log(JSON.stringify(state), 123)
    })
    room.onMessage('*', () => {})
    room.onMessage<Character>(F.G_Character_Data, (character) =>
      actions.G_Character_Data(character)
    )
    room.onMessage(F.G_Start_Combat, (data) => actions.G_Start_Combat(data))
    room.onMessage(F.G_Add_Item, (data) => actions.G_Add_Item(data))
    room.onMessage(F.G_EXCUTE_SKILL, (data) => actions.G_EXCUTE_SKILL(data))
    room.onMessage(F.G_SPANW_ENEMY, (data) => actions.G_SPANW_ENEMY(data))
    // room.onMessage<Userinfo>(F.G_JOIN, (userinfo) => {
    //   console.log('加入游戏房间成功', userinfo)
    //   // userinfo.doAction()
    // })
    // console.log('game', room)
  },
  startCombat(map:GameMap) {
    // if(!game.scene.inCombat.value) {
      this.room?.send(F.G_Start_Combat, map)
    // }
  }
}
