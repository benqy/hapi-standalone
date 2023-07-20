import { getController } from '../core'
import { Character } from '../entities'
import { AffixProertys } from '../entities/modifiers/affix-property'
import { IController, TickAble } from '../interfaces'
export class CharacterController implements IController, TickAble {
  constructor() {}

  actionRequired: boolean = false

  getProperties(character: Character) {
    let ap = new AffixProertys()
    ap = getController().affix.add(ap, character.affixProertys)
    ap = getController().affix.add(ap, character.equipped.affixProertys)
    return ap
  }

  doTick(deltaTime: number) {
    console.log('char doTick')
  }

  doAction(deltaTime: number) {
    console.log('doAction')
  }
}
