import { F } from '@hapi/common/constants'
import { Character } from '@hapi/common/entities'
import { game } from './game'
import { Userinfo } from '@hapi/common/entities'
import { Room } from 'colyseus.js'
// import { Intenvory } from '@hapi/common/entities/inventory'
// import { PlayerController } from '@hapi/common/controller'

export type Action = (room: Room, data: any) => void

export const actions = {
  [F.AUTH_JOIN]: (userinfo: Userinfo) => {
    // const user = plainToClass(Userinfo, userinfo)
    // game.player.userinfo = userinfo
    // game.c.play.userDoAction(userinfo)
  },
  [F.G_Character_Data]: (character: Character) => {
    // game.player.character = character
    // console.log(character, 111)
    // // console.log(inventory instanceof Intenvory, 111)
    // console.log(character.equipped instanceof Intenvory, 222)
    // game.scene.player.value.character = character
  },
  [F.G_Start_Combat]: (data: any) => {
    console.log(data)
  },
  [F.G_Add_Item]:(data: any) => {
  }
}

// export const actionTypes = {
//   [F.AUTH_JOIN]: Userinfo
// }
