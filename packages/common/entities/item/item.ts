import { O } from '../../core/base'
import { ItemCategory } from '../interface'
import { Category } from '../../types'
import { itemCategorys1, itemCategorys2, itemCategorys3 } from '../../data'

export abstract class Item extends O implements ItemCategory {
  constructor() {
    super()
  }

  name: String = 'BUG'
  category1: Category = itemCategorys1.other
  category2: Category = itemCategorys2.other
  category3: Category = itemCategorys3.other

  desc = ''

  //sprite地址,
  get media() {
    //分类3不作为路径
    return `/static/game/items/${this.category1.name}/${this.category2.name}/${this.name}.webp`
  }
}
