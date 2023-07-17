import { O } from '../../core/base'
import { Item } from '../item'

//背包
export class Intenvory extends O {
  constructor(public maxSlot: number) {
    super()
    for (let i = 0; i < this.maxSlot; i++) {
      this.items.set(i.toString(), null)
    }
  }

  items: Map<string, Item> = new Map()
}
