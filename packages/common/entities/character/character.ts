import { IActor } from '../iactor'
import { O } from '../../core/base'
import { Equipped } from '../../components/equipped'
import { Equipment } from '../item/equipment'

export class Character extends O implements IActor {
  constructor() {
    super()
  }

  name = 'character'
  maxHealth = 100
  health = 100
  currentHealth: number
  readonly equipped: Equipped = new Equipped()
  doTick() {
    console.log('character tick')
  }
  doAction() {
    console.log('character action')
  }
}
