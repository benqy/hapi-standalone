import { O } from '../../core/base'
import { ItemCategory, ItemType } from '../../enum'

export abstract class Item extends O {
  constructor() {
    super()
  }

  name: String
  category: ItemCategory
  itemType: ItemType
  desc = ''

  get media() {
    const typePath = this.itemType ?? 'other'
    return `/static/game/items/${this.category}/${typePath}/${this.name}.webp`
  }
}
