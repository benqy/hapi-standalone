import { Scene } from './scene'

import { RoomState, CONSTANTS } from '@hapi/common'
import { getAccessToken } from '@/utils'
import { Character } from '@hapi/common/entities'
import { actions } from './actions'
import { client } from './client'
import { Room } from 'colyseus.js'
import { core } from '@hapi/common'
import { SceneRender } from './render'
import { GameSound } from './sound'
export * from './game'
import { lang } from '../i18n'
import type { IActor } from '@hapi/common/entities/interface'
const F = CONSTANTS.F

export const game = {
  scene: new Scene(),
  sound: new GameSound(),
  startCombatRender() {
    if (this.render) {
      this.render.clear()
    } else {
      this.render = new SceneRender()
    }
    this.render.renderMap(this.scene.combatMap.mapType)
    this.render.entityRender.renderCharacter(this.character)
  },
  render: null as SceneRender | null,
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
  },
  bindMessage(room: Room<RoomState.Game>) {
    room.onStateChange(() => {
      // console.log(JSON.stringify(state), 123)
    })
    room.onMessage('*', () => {})
    room.onMessage(F.G_Character_Data, (character) => actions.G_Character_Data(character))
    room.onMessage(F.G_Start_Combat, (data) => actions.G_Start_Combat(data))
    room.onMessage(F.G_Add_Item, (data) => actions.G_Add_Item(data))
    room.onMessage(F.G_EXCUTE_SKILL, (data) => actions.G_EXCUTE_SKILL(data))
    room.onMessage(F.G_SPANW_ENEMY, (data) => actions.G_SPANW_ENEMY(data))
    room.onMessage(F.G_Hit, (data) => actions.G_Hit(data))
    // room.onMessage<Userinfo>(F.G_JOIN, (userinfo) => {
    //   console.log('加入游戏房间成功', userinfo)
    //   // userinfo.doAction()
    // })
    // console.log('game', room)
  },
  startCombat(mapId: string) {
    // if(!game.scene.inCombat.value) {
    this.room?.send(F.G_Start_Combat, mapId)
    // }
  },
  lang(text: string): string {
    const zhcn = lang.zhcn as any
    const keys = text.split('.')
    let word = zhcn
    keys.forEach((key) => {
      word = word[key]
    })
    return word ?? text
  },
  getActor(id: string): IActor | null {
    //目前实现只有1对1战斗,只有2个单位
    // console.log(id,this.character.id)
    if (this.character && this.character.id === id) {
      return this.character
    } else if (this.scene.mainEnemy.value && this.scene.mainEnemy.value.id === id) {
      return this.scene.mainEnemy.value
    }
    return null
  }
}
