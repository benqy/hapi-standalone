/**
 *
 * TODO: reqLevel, Itemtype整理, 词缀数据静态类型
 *
 */

import { LootTable } from '../components/loot-table'
import { EQUIP_TYPE_LIST } from '../constants'
import { modifiersByGroupId, modifiersTierByLevel } from '../data/modifiers'
import { AffixValue, Equipment } from '../entities'
import { DropRateByRarity, ItemType, Rarity } from '../enum'
import { choice, randomFromArrayNRemove } from '../util'

// import {
//   BASE_DROP_CHANCE,
//   DropRateByRarity,
//   EQUIP_TYPES,
//   RARITY,
// } from './constants'
// import { randomIndexFromArray, UUIDv4, randomFromArrayNRemove } from './util'
// import { Equipment } from './entities/equipment'

// const equipTypeNames = Object.keys(EQUIP_TYPES)

// //** 全局掉率,稀有度调整 */
// const globalIIR = 10
// const globalIIQ = 1

// const generateModifilerTier = (equipType, tiers) => {
//   if (!tiers || tiers.length === 0) return null
//   const tierByLimit = tiers.data.filter((t) => t.tierLimit[equipType])
//   return randomFromArrayNRemove(tierByLimit)
// }

// /**
//  * equip type -> level -> equip base type -> rarity -> affix -> create
//  * @param {*} enemy
//  */
// const createItem = ({ dropLevel = 1, iir = 1, equipType = null }) => {
//   equipType = equipType || randomIndexFromArray(equipTypeNames)
//   //暂时未设定基底类型
//   const rarity = calcRarity(iir)
//   const [reqLevel] = calcMaxTier(dropLevel)
//   const modifiers = generateModifilers(equipType, rarity)
//   const equipment = new Equipment({
//     name: 'hammer1',
//     id: UUIDv4(),
//     rarity: rarity,
//     type: equipType,
//     itLevel: dropLevel,
//     reqLevel: parseInt(reqLevel * 0.8),
//     modifiers,
//   })
//   return equipment
// }

// const calcLootAmount = (iiq) => {
//   const randomNum = Math.random()
//   const dropAmount = BASE_DROP_CHANCE * iiq * globalIIQ
//   const roundedAmount = Math.floor(dropAmount)
//   const finalAmount =
//     randomNum <= dropAmount - roundedAmount ? roundedAmount + 1 : roundedAmount
//   return finalAmount
// }

class LootController {
  // /**
  //  *  calc drop quantity -> createItem
  //  * @param {*} enemy
  //  */
  // loot (enemy) => {
  //   const finalAmount = calcLootAmount(enemy.iiq)
  //   const items = []
  //   for (let i = 0; i < finalAmount; i++) {
  //     const item = createItem({ dropLevel: enemy.dropLevel, iir: enemy.iir })
  //     item && items.push(item)
  //   }
  //   return items
  // }
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
    for (let i = 1; i <= modifiersTierByLevel.length; i++) {
      if (dropLevel >= modifiersTierByLevel[i]) {
        return modifiersTierByLevel[i]
      }
    }
    return 10
  }

  private generateModifilerTier = (equipType: ItemType, tiers) => {
    if (!tiers || tiers.length === 0) return null
    const tierByLimit = tiers.data.filter((t) => t.tierLimit[equipType])
    return randomFromArrayNRemove(tierByLimit)
  }

  /**
   * 根据参数生成装备的随机词缀. 选取词缀类型->选取词缀tier->选取词缀范围->返回词缀列表
   */
  private generateModifilers(equipType, rarity) {
    const equipModifiers = []
    const tiers = modifiersByGroupId.filter((t) => t.tierLimit[equipType])
    const prefixTiers = [...tiers.filter((t) => t.position === 0)]
    const suffixTiers = [...tiers.filter((t) => t.position === 1)]

    if (rarity === Rarity.magic) {
      const p1 = this.generateModifilerTier(
        equipType,
        randomFromArrayNRemove(prefixTiers)
      )
      const s1 = this.generateModifilerTier(
        equipType,
        randomFromArrayNRemove(suffixTiers)
      )
      p1 && equipModifiers.push(p1)
      s1 && equipModifiers.push(s1)
    } else if (rarity === Rarity.rare || rarity === Rarity.unique) {
      const p1 = this.generateModifilerTier(
        equipType,
        randomFromArrayNRemove(prefixTiers)
      )
      const p2 = this.generateModifilerTier(
        equipType,
        randomFromArrayNRemove(prefixTiers)
      )
      const s1 = this.generateModifilerTier(
        equipType,
        randomFromArrayNRemove(suffixTiers)
      )
      const s2 = this.generateModifilerTier(
        equipType,
        randomFromArrayNRemove(suffixTiers)
      )
      p1 && equipModifiers.push(p1)
      p2 && equipModifiers.push(p2)
      s1 && equipModifiers.push(s1)
      s2 && equipModifiers.push(s2)
    }

    return equipModifiers
    // console.log(modifiers.filter(t=> t.id))
  }

  private generateAffixValus(modifiers) {
    let values: AffixValue[] = []
    if (modifiers) {
      let tierName = modifiers.length ? `${modifiers[0].tierName}的` : ''
      tierName +=
        modifiers.length > 1
          ? `${modifiers[modifiers.length - 1].tierName}`
          : ''
      values = modifiers
        .map((t) => new AffixValue(t))
        .sort((a, b) => a.position - b.position)
      // console.log(this)
      const equipment = new Equipment(values)
      equipment.name = tierName + 'BUG'
      return equipment
    }
  }

  private createItem(dropLevel = 1, iir = 1, equipType: ItemType) {
    // equipType = equipType || choice(Object.keys(ItemType))
    //暂时未设定基底类型
    const rarity = this.calcRarity(iir)
    const reqLevel = this.calcMaxTier(dropLevel)
    const modifiers = this.generateModifilers(equipType, rarity)
    // {
    //   rarity: rarity,
    //   type: equipType,
    //   itLevel: dropLevel,
    //   reqLevel: parseInt(reqLevel * 0.8),
    //   modifiers,
    // }
    const equipment = this.generateAffixValus(modifiers)
    equipment.itemType = equipType
    equipment.rarity = rarity
    equipment.itLevel = dropLevel
    equipment.reqLevel = Math.ceil(reqLevel * 0.8)
    return equipment
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
