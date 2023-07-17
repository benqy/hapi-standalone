import { F } from '@hapi/common/constants'
import { Character } from '@hapi/common/entities'
import { game } from './game'
import { Userinfo } from '@hapi/common/entities'

export const Actions = {
  [F.AUTH_JOIN]: (userinfo: Userinfo) => {
    game.scene.player.value.userinfo = userinfo
  },
  [F.G_Character_Data]: (character: Character) => {
    game.scene.player.value.character = character
    console.log('G_Character_Data', game.scene.player.value.character.inventory)
  }
}

export const actionTypes = {
  [F.AUTH_JOIN]: Userinfo,
}