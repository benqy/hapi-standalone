/**
 *
 * TODO: reqLevel, 词缀数据静态类型
 *
 */

import { LootTable } from '../components/loot-table'
import { BASE_DROP_CHANCE } from '../constants'
import { modifiersByGroupId, modifiersTierByLevel } from '../data/modifiers'
import { AffixValue, Enemy, Equipment } from '../entities'
import { DropRateByRarity, Rarity } from '../enum'
import { Category } from '../types'
import { choice, randomFromArrayNRemove } from '../util'
import { equipmentFromCategorys2, itemCategorys1 } from '../data'
import { getController } from '../core'

class LootController {
  private globalIIR = 10
  private globalIIQ = 1

  private calcRarity(iir) {
    const finalIir = iir * this.globalIIR
    const randomNum = Math.random()
    if (randomNum <= finalIir * DropRateByRarity.unique) {
      return Rarity.unique
    } else if (
      randomNum <=
      finalIir * (DropRateByRarity.rare + DropRateByRarity.unique)
    ) {
      return Rarity.rare
    } else if (
      randomNum <=
      finalIir *
        (DropRateByRarity.rare +
          DropRateByRarity.unique +
          DropRateByRarity.magic)
    ) {
      return Rarity.magic
    } else {
      return Rarity.common
    }
  }

  private calcMaxTier(dropLevel) {
    // 从t1遍历到t10,找到第一个小于等于dropLevel的tier
    for (let i = 1; i < modifiersTierByLevel.length; i++) {
      if (dropLevel >= modifiersTierByLevel[i]) {
        return [modifiersTierByLevel[i],i]
      }
    }
    return [100,10]
  }

  private generateModifilerTier = (category: Category, tiers,tier:number) => {
    if (!tiers || tiers.length === 0) return null
    const tierByLimit = tiers.data.filter((t) => t.tierLimit[category.name] && t.tier >= tier)
    // console.log(tierByLimit,1)
    return randomFromArrayNRemove(tierByLimit)
  }

  /**
   * 根据参数生成装备的随机词缀. 选取词缀类型->选取词缀tier->选取词缀范围->返回词缀列表
   */
  private generateModifilers(category: Category, rarity,tier: number) {
    const equipModifiers = []
    const tiers = modifiersByGroupId.filter((t) => t.tierLimit[category.name])
    const prefixTiers = [...tiers.filter((t) => t.position === 0)]
    const suffixTiers = [...tiers.filter((t) => t.position === 1)]

    if (rarity === Rarity.magic) {
      const p1 = this.generateModifilerTier(
        category,
        randomFromArrayNRemove(prefixTiers),
        tier
      )
      const s1 = this.generateModifilerTier(
        category,
        randomFromArrayNRemove(suffixTiers),
        tier
      )
      p1 && equipModifiers.push(p1)
      s1 && equipModifiers.push(s1)
    } else if (rarity === Rarity.rare || rarity === Rarity.unique) {
      const p1 = this.generateModifilerTier(
        category,
        randomFromArrayNRemove(prefixTiers),
        tier
      )
      const p2 = this.generateModifilerTier(
        category,
        randomFromArrayNRemove(prefixTiers),
        tier
      )
      const s1 = this.generateModifilerTier(
        category,
        randomFromArrayNRemove(suffixTiers),
        tier
      )
      const s2 = this.generateModifilerTier(
        category,
        randomFromArrayNRemove(suffixTiers),
        tier
      )
      p1 && equipModifiers.push(p1)
      p2 && equipModifiers.push(p2)
      s1 && equipModifiers.push(s1)
      s2 && equipModifiers.push(s2)
    }

    return equipModifiers
    // console.log(modifiers.filter(t=> t.id))
  }

  private affixSchemaToValue(modifiers) {
    let values: AffixValue[] = []
    if (modifiers) {
      let tierName = modifiers.length ? `${modifiers[0].tierName}的` : ''
      tierName +=
        modifiers.length > 1
          ? `${modifiers[modifiers.length - 1].tierName}`
          : ''
      values = modifiers
        .map((t) => getController().affix.schemaToValue(t))
        .sort((a, b) => a.position - b.position)
      // console.log(this)
      const equipment = new Equipment(values)
      equipment.name = tierName + '无名装备'
      return equipment
    }
  }

  private createItem(dropLevel = 1, iir = 1, category?: Category) {
    // equipType = equipType || choice(Object.keys(ItemType))
    category = category || choice(equipmentFromCategorys2)
    //暂时未设定基底类型
    const rarity = this.calcRarity(iir)
    const [reqLevel,tier] = this.calcMaxTier(dropLevel)
    const modifiers = this.generateModifilers(category, rarity,tier)
    const equipment = this.affixSchemaToValue(modifiers)
    equipment.category1 = itemCategorys1.equipment
    equipment.category2 = category
    equipment.rarity = rarity
    equipment.itLevel = dropLevel
    equipment.reqLevel = Math.ceil(reqLevel * 0.8)
    return equipment
  }

  private calcLootAmount(iiq) {
    const randomNum = Math.random()
    const dropAmount = BASE_DROP_CHANCE * iiq * this.globalIIQ
    const roundedAmount = Math.floor(dropAmount)
    const finalAmount =
      randomNum <= dropAmount - roundedAmount
        ? roundedAmount + 1
        : roundedAmount
    return finalAmount
  }

  /**
   *  calc drop quantity -> createItem
   * @param {*} enemy
   */
  loot(enemy: Enemy) {
    const finalAmount = this.calcLootAmount(enemy.iiq)
    const items = []
    for (let i = 0; i < finalAmount; i++) {
      const item = this.createItem(enemy.dropLevel, enemy.iir)
      item && items.push(item)
    }
    return items
  }

  lootFromTable(lootTable: LootTable = null, num = 1, dropLevel = 1, iir = 1) {
    const items = []
    if (!lootTable || !lootTable.list) return
    for (let i = 0; i < num; i++) {
      const item = this.createItem(dropLevel, iir, lootTable.choose({ num }))
      item && items.push(item)
    }
    return items
  }
}

export const lootController = new LootController()
