import { Item } from './item'
import { EquipSlot } from '../../enum'
import { AffixValue } from '../modifiers'

export class Equipment extends Item {
  constructor(public affixValues: AffixValue[] = []) {
    super()
  }
  equipSlot: EquipSlot
  //物品等级
  itLevel: number
  //需求等级
  reqLevel: number
}
