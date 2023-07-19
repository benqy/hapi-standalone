import { Category } from '../types'
export const itemCategorys1 = {
  equipment: <Category>{
    name: 'equipment',
    code: '01',
    parent: null,
  },
  other: <Category>{
    name: '其他',
    code: '09',
    parent: null,
  },
}

export const itemCategorys2 = {
  helment: <Category>{
    name: 'helment',
    code: '0101',
    parent: '01',
  },
  shoulder: <Category>{
    name: 'shoulder',
    code: '0102',
    parent: '01',
  },
  body: <Category>{
    name: 'body',
    code: '0103',
    parent: '01',
  },
  glove: <Category>{
    name: 'glove',
    code: '0104',
    parent: '01',
  },
  ring: <Category>{
    name: 'ring',
    code: '0105',
    parent: '01',
  },
  weapon: <Category>{
    name: 'weapon',
    code: '0106',
    parent: '01',
  },
  amulet: <Category>{
    name: 'amulet',
    code: '0107',
    parent: '01',
  },
  belt: <Category>{
    name: 'belt',
    code: '0108',
    parent: '01',
  },
  trousers: <Category>{
    name: 'trousers',
    code: '0109',
    parent: '01',
  },
  boot: <Category>{
    name: 'boot',
    code: '0110',
    parent: '01',
  },
  shield: <Category>{
    name: 'shield',
    code: '0111',
    parent: '01',
  },
  potions: <Category>{
    name: 'potions',
    code: '0901',
    parent: '09',
  },
  other: <Category>{
    name: 'other2',
    code: '0999',
    parent: '09',
  },
}

export const itemCategorys3 = {
  other: <Category>{
    name: 'other3',
    code: '099999',
    parent: '0999',
  },
}

//装备的类型列表(不包含二级分类,如锤子,单手剑都统一为武器)
export const equipmentFromCategorys2 = Object.values(itemCategorys2).filter(
  (item) => item.parent === '01'
)
