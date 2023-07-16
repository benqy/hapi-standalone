//物品类型
export enum ItemCategory {
  equipment = 'equipment',
  consumable = 'consumable',
  material = 'material',
  other = 'other',
}

export enum ItemType {
  helment = '头盔',
  shoulder = '肩甲',
  body = '盔甲',
  glove = '护手',
  ring = '指环',
  weapon = '武器',
  amulet = '项链',
  belt = '腰带',
  trousers = '护腿',
  boot = '拖鞋',
  shield = '盾牌',
  potions = '药水',
}

export enum Rarity {
  common = 'common',
  magic = 'magic',
  rare = 'rare',
  unique = 'unique',
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
  hand3 = 'hand3',
  hand4 = 'hand4',
}