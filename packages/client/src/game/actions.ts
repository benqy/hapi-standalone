import { F } from '@hapi/common/constants'
import { Character } from '@hapi/common/entities'
import { game } from './game'

export const Actions = {
  [F.G_Character_Data]: (character: Character) => {
    // console.log(game.room.selfCharacter.value,444)
    game.room.value.selfCharacter = character
  }
}
