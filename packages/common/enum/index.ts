//物品分类1
// export enum ItemCategory1 {
//   equipment = 'equipment',
//   consumable = 'consumable',
//   material = 'material',
//   other = 'other',
// }

// //物品分类2 头盔/药水/珠宝...
// export enum ItemCategory2 {
//   helment = 'helment',
//   shoulder = 'shoulder',
//   body = 'body',
//   glove = 'glove',
//   ring = 'ring',
//   weapon = 'weapon',
//   amulet = 'amulet',
//   belt = 'belt',
//   trousers = 'trousers',
//   boot = 'boot',
//   shield = 'shield',
//   potions = 'potions'
// }

// export enum ItemCategory3 {
//   other = 'other'
// }

export enum Rarity {
  common = 'common',
  magic = 'magic',
  rare = 'rare',
  unique = 'unique',
}

export namespace Rarity {
  export function getRarityByDropRate(dropRate: number) {}
}

export enum DropRateByRarity {
  // [RARITY.common] 0.8,
  magic = 0.15,
  rare = 0.05,
  unique = 0.01,
}

export enum EquipSlot {
  helment = 'helment',
  shoulder = 'shoulder',
  body = 'body',
  glove = 'glove',
  ring1 = 'ring1',
  ring2 = 'ring2',
  amulet = 'amulet',
  belt = 'belt',
  trousers = 'trousers',
  boot = 'boot',
  hand1 = 'hand1',
  hand2 = 'hand2',
  // hand3 = 'hand3',
  // hand4 = 'hand4',
}

export enum MapGroup {
  world1 = 'world1',
  forest = 'forest',
  desert = 'desert',
  sea = 'sea',
  sky = 'sky',
  hell = 'hell',
  dead = 'dead',
}