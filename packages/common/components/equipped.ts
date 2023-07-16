import { Equipment } from '../entities/item/equipment'
import { AffixProertys } from '../entities/modifiers/affix-property'
import { EquipSlot, ItemType } from '../enum'

export class Equipped {
  readonly equipments: Map<EquipSlot, Equipment> = new Map()

  private getEquipSlot(equipment: Equipment): EquipSlot | null {
    switch (equipment.itemType) {
      case ItemType.helment:
        return EquipSlot.helment
      case ItemType.shoulder:
        return EquipSlot.shoulder
      case ItemType.body:
        return EquipSlot.body
      case ItemType.ring:
        return EquipSlot.ring1
      case ItemType.amulet:
        return EquipSlot.amulet
      case ItemType.belt:
        return EquipSlot.belt
      case ItemType.trousers:
        return EquipSlot.trousers
      case ItemType.boot:
        return EquipSlot.boot
      case ItemType.weapon:
        return EquipSlot.hand1
      case ItemType.shield:
        return EquipSlot.hand2
      default:
        null
    }
  }

  affixProertys = new AffixProertys()

  addEquipment(equipment: Equipment, equipSlot?: EquipSlot): Equipped {
    equipSlot = equipSlot ?? this.getEquipSlot(equipment)
    if (equipSlot) {
      //移除装备前先移除装备的属性
      if (this.equipments.has(equipSlot)) {
        const oldEquipment = this.equipments.get(equipSlot)
        if (oldEquipment) {
          this.affixProertys.remove(oldEquipment.affixProertys)
        }
      }
      this.equipments.set(equipSlot, equipment)
      this.affixProertys.add(equipment.affixProertys)
    }
    return this
  }
}
