import { F } from '@hapi/common/constants'
import { Character } from '@hapi/common/entities'
import { game } from './game'
import { Userinfo } from '@hapi/common/entities'

const player = game.room.value.player
export const Actions = {
  [F.AUTH_JOIN]: (userinfo: Userinfo) => {
    player.userinfo = userinfo
  },
  [F.G_Character_Data]: (character: Character) => {
    player.character = character
  }
}
