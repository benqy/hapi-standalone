import { Item } from './item'
import { Rarity } from '../../enum'
import { EquipSlot } from '../../enum'
import { AffixProertys } from '../modifiers/affix-property'

export class Equipment extends Item {
  constructor() {
    super()
  }
  equipSlot: EquipSlot
  rarity = Rarity.common
  itLevel: number
  reqLevel: number

  affixProertys = new AffixProertys()
}
