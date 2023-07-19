import { Item } from './item'
import { Rarity } from '../../enum'
import { EquipSlot } from '../../enum'
import { AffixProertys } from '../modifiers/affix-property'
import { AffixValue } from '../modifiers'

export class Equipment extends Item {
  constructor(public affixValues: AffixValue[] = []) {
    super()
  }
  equipSlot: EquipSlot
  rarity = Rarity.common
  //物品等级
  itLevel: number
  //需求等级
  reqLevel: number
}
