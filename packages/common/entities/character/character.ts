import { IActor } from '../interface'
import { O } from '../../core/base'
import { Equipped } from '../../components/equipped'
import { AffixProertys } from '../modifiers/affix-property'

export class Character extends O implements IActor {
  constructor() {
    super()
  }

  name = 'character'
  maxHealth = 100
  health = 100
  currentHealth: number
  readonly affixProertys = new AffixProertys()
  readonly equipped: Equipped = new Equipped()

  getProperties() {
    return new AffixProertys()
      .add(this.affixProertys)
      .add(this.equipped.affixProertys)
  }

  doTick() {
    console.log('character tick')
  }
  doAction() {
    console.log('character action')
  }
}
