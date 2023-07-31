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

export enum MapType {
  forest = 'forest',
  desert = 'desert',
  sea = 'sea',
  sky = 'sky',
  hell = 'hell',
  dead = 'dead',
}




export enum PathKey {
  damage_increase = 'damage_increase',
  damage_more = 'damage_more',
  damage_add = 'damage_add',
  speed_increase = 'speed_increase',
  health_add = 'health_add',
  armour_increase = 'armour_increase',
  armour_add = 'armour_add',
  resistance_add = 'resistance_add',
  strength_add = 'strength_add',
  dexterity_add = 'dexterity_add',
  intelligence_add = 'intelligence_add',
  regenerate_add = 'regenerate_add',
}