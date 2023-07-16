/**
 *
 * TODO: reqLevel bug
 *
 */
// import { modifiersTierByLevel, modifiersByGroupId } from '@hapi/common'

// import {
//   BASE_DROP_CHANCE,
//   BASE_DROP_RARITYS,
//   EQUIP_TYPES,
//   RARITY,
// } from './constants'
// import { randomIndexFromArray, UUIDv4, randomFromArrayNRemove } from './util'
// import { Equipment } from './entities/equipment'

// const equipTypeNames = Object.keys(EQUIP_TYPES)

// //** 全局掉率,稀有度调整 */
// const globalIIR = 10
// const globalIIQ = 1

// const calcMaxTier = (dropLevel) => {
//   for (let i = 1; i <= modifiersTierByLevel.length; i++) {
//     if (dropLevel >= modifiersTierByLevel[i]) {
//       return [i, modifiersTierByLevel[i]]
//     }
//   }
//   return 10
// }

// /**
//  * 计算稀有度
//  * @returns
//  */
// const calcRarity = (iir) => {
//   const finalIir = iir * globalIIR
//   const randomNum = Math.random()
//   // console.log(iir,iir * BASE_DROP_RARITYS[RARITY.rare],iir * BASE_DROP_RARITYS[RARITY.magic], randomNum)
//   if (randomNum <= finalIir * BASE_DROP_RARITYS.unique) {
//     return RARITY.unique
//   } else if (
//     randomNum <=
//     finalIir * (BASE_DROP_RARITYS.rare + BASE_DROP_RARITYS.unique)
//   ) {
//     return RARITY.rare
//   } else if (
//     randomNum <=
//     finalIir *
//       (BASE_DROP_RARITYS.rare +
//         BASE_DROP_RARITYS.unique +
//         BASE_DROP_RARITYS.magic)
//   ) {
//     return RARITY.magic
//   } else {
//     return RARITY.common
//   }
// }

// const generateModifilerTier = (equipType, tiers) => {
//   if (!tiers || tiers.length === 0) return null
//   const tierByLimit = tiers.data.filter((t) => t.tierLimit[equipType])
//   return randomFromArrayNRemove(tierByLimit)
// }

// /**
//  * 根据参数生成装备的随机词缀. 选取词缀类型->选取词缀tier->选取词缀范围->返回词缀列表
//  */
// const generateModifilers = (equipType, rarity) => {
//   const equipModifiers = { prefix: [], suffix: [] }
//   const tiers = modifiersByGroupId.filter((t) => t.tierLimit[equipType])
//   const prefixTiers = [...tiers.filter((t) => t.position === 0)]
//   const suffixTiers = [...tiers.filter((t) => t.position === 1)]

//   if (rarity === RARITY.magic) {
//     const p1 = generateModifilerTier(
//       equipType,
//       randomFromArrayNRemove(prefixTiers)
//     )
//     const s1 = generateModifilerTier(
//       equipType,
//       randomFromArrayNRemove(suffixTiers)
//     )
//     p1 && equipModifiers.prefix.push(p1)
//     s1 && equipModifiers.suffix.push(s1)
//   } else if (rarity === RARITY.rare || rarity === RARITY.unique) {
//     const p1 = generateModifilerTier(
//       equipType,
//       randomFromArrayNRemove(prefixTiers)
//     )
//     const p2 = generateModifilerTier(
//       equipType,
//       randomFromArrayNRemove(prefixTiers)
//     )
//     const s1 = generateModifilerTier(
//       equipType,
//       randomFromArrayNRemove(suffixTiers)
//     )
//     const s2 = generateModifilerTier(
//       equipType,
//       randomFromArrayNRemove(suffixTiers)
//     )
//     p1 && equipModifiers.prefix.push(p1)
//     p2 && equipModifiers.prefix.push(p2)
//     s1 && equipModifiers.suffix.push(s1)
//     s2 && equipModifiers.suffix.push(s2)
//   }

//   return equipModifiers
//   // console.log(modifiers.filter(t=> t.id))
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



  // lootFromTable({ lootTable = null, num = 1, dropLevel = 1, iir = 1 }) {
  //   const items = []
  //   if (!lootTable || !lootTable.list) return
  //   for (let i = 0; i < num; i++) {
  //     const item = createItem({
  //       dropLevel,
  //       iir,
  //       equipType: lootTable.choose({ num }).result,
  //     })
  //     item && items.push(item)
  //   }
  //   return items
  // }
}

export const lootController = new LootController()
