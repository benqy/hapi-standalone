import { itemCategorys2 } from '../data'
import { Equipment } from '../entities/item/equipment'
import { AffixProertys } from '../entities/modifiers/affix-property'
import { EquipSlot } from '../enum'

export class Equipped {
  readonly equipments: Map<EquipSlot, Equipment> = new Map()

  private getEquipSlot(equipment: Equipment): EquipSlot | null {
    switch (equipment.category2.name) {
      case itemCategorys2.helment.name:
        return EquipSlot.helment
      case itemCategorys2.shoulder.name:
        return EquipSlot.shoulder
      case itemCategorys2.body.name:
        return EquipSlot.body
      case itemCategorys2.ring.name:
        return EquipSlot.ring1
      case itemCategorys2.amulet.name:
        return EquipSlot.amulet
      case itemCategorys2.belt.name:
        return EquipSlot.belt
      case itemCategorys2.trousers.name:
        return EquipSlot.trousers
      case itemCategorys2.boot.name:
        return EquipSlot.boot
      case itemCategorys2.weapon.name:
        return EquipSlot.hand1
      case itemCategorys2.shield.name:
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
