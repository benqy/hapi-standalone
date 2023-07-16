import { Item } from './item'
import { Rarity } from '../../enum'
import { EquipSlot } from '../../enum'
import { AffixProertys } from '../modifiers/affix-property'
import { AffixValue } from '../modifiers'

export class Equipment extends Item {
  constructor(private affixValues: AffixValue[] = []) {
    super()
  }
  equipSlot: EquipSlot
  rarity = Rarity.common
  //物品等级
  itLevel: number
  //需求等级
  reqLevel: number

  private _affixProertys: AffixProertys = null
  get affixProertys() {
    if (this._affixProertys === null) {
      this.updateBaseValue()
    }
    return this._affixProertys
  }

  private updateBaseValue() {
    this._affixProertys = new AffixProertys()
    this.affixValues.forEach((affixValue) => {
      this._affixProertys.add(affixValue)
    })
  }
}
