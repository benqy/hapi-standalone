import { itemCategorys2 } from '../data'
import { Equipment } from '../entities/item/equipment'
import { AffixProertys } from '../entities/modifiers/affix-property'
import { EquipSlot } from '../enum'

export class Equipped {
  equipments: Map<EquipSlot, Equipment> = new Map()

  affixProertys = new AffixProertys()
}
