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
    game.player.userinfo = userinfo
    // game.c.play.userDoAction(userinfo)
  },
  [F.G_Character_Data]: (character: Character) => {
    console.log(character, 111)
    game.player.character = character
  },
  [F.G_Start_Combat]: (data:any) => {
    game.scene.mainEnemy = data.mainEnemy
    game.scene.enemys = data.enemys
    game.scene.inCombat = true
    console.log(game.scene.mainEnemy,game.scene.enemys,5)
  }
}

// export const actionTypes = {
//   [F.AUTH_JOIN]: Userinfo
// }
