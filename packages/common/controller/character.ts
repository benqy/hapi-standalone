import { getController } from '../core'
import { Character } from '../entities'
import { AffixProertys } from '../entities/modifiers/affix-property'
import { IController } from '../interfaces'
export class CharacterController implements IController {
  constructor() {}

  getProperties(character: Character) {
    let ap = new AffixProertys()
    ap = getController().affix.add(ap, character.affixProertys)
    ap = getController().affix.add(ap, character.equipped.affixProertys)
    return ap
  }
}
