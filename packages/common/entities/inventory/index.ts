import { O } from '../../core/base'
import { ItemKV } from '../../interfaces'

//背包
export class Intenvory extends O {
  constructor(public maxSlot: number) {
    super()
    for (let i = 0; i < this.maxSlot; i++) {
      this.items[i.toString()] = null
    }
  }

  items: ItemKV = {}
}
