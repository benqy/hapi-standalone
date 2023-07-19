import { IActor } from '../interface'
import { O } from '../../core/base'
import { Equipped } from '../../components/equipped'
import { AffixProertys } from '../modifiers/affix-property'
import { Intenvory } from '../inventory'

export class Character extends O implements IActor {
  constructor() {
    super()
  }

  name = 'BUG'
  maxHealth = 100
  health = 100
  currentHealth: number
  inventory = new Intenvory(94)

  //角色基础战斗数据
  affixProertys = new AffixProertys()
  equipped: Equipped = new Equipped()
}
