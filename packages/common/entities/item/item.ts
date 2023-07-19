import { O } from '../../core/base'
import { ItemCategory } from '../interface'
import { Category } from '../../types'
import { itemCategorys1, itemCategorys2, itemCategorys3 } from '../../data'
import { Rarity } from '../../enum'

export abstract class Item extends O implements ItemCategory {
  constructor() {
    super()
  }

  name: String = 'BUG'
  rarity = Rarity.common
  category1: Category = itemCategorys1.other
  category2: Category = itemCategorys2.other
  category3: Category = itemCategorys3.other

  desc = ''
}
