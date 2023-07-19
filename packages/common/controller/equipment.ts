import { AffixValue, Equipment } from '../entities'
import { AffixSchema } from '../types'
import { randomBetween } from '../util'
import { IController } from '../interfaces'
import { AffixProertys } from '../entities/modifiers/affix-property'
import { EquipSlot } from '../enum'
import { itemCategorys2 } from '../data'
import { Equipped } from '../components/equipped'
import { getController } from '../core'

export class EquipmentController implements IController {
  getEquipSlot(equipment: Equipment): EquipSlot | null {
    switch (equipment.category2.name) {
      case itemCategorys2.helment.name:
        return EquipSlot.helment
      case itemCategorys2.shoulder.name:
        return EquipSlot.shoulder
      case itemCategorys2.body.name:
        return EquipSlot.body
      case itemCategorys2.glove.name:
        return EquipSlot.glove
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

  getEquipmentProertys(equipment: Equipment) {
    let ap = new AffixProertys()
    equipment.affixValues.forEach((affixValue) => {
      getController().affix.add(ap, affixValue)
    })
    return ap
  }

  addEquipment(ep: Equipped, equipment: Equipment, equipSlot?: EquipSlot) {
    equipSlot = equipSlot ?? this.getEquipSlot(equipment)
    const affC = getController().affix
    if (equipSlot) {
      //移除装备前先移除装备的属性
      if (ep.equipments.has(equipSlot)) {
        const oldEquipment = ep.equipments.get(equipSlot)
        if (oldEquipment) {
          affC.remove(ep.affixProertys, this.getEquipmentProertys(oldEquipment))
        }
      }
      ep.equipments.set(equipSlot, equipment)
      affC.add(ep.affixProertys, this.getEquipmentProertys(equipment))
    }
  }
}
