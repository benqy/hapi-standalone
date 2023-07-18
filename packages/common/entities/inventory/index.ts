import { Type } from 'class-transformer'
import { O } from '../../core/base'
import { ItemKV } from '../../interfaces'
import { Item } from '../item'

//背包
export class Intenvory extends O {
  constructor(public maxSlot: number) {
    super()
    for (let i = 0; i < this.maxSlot; i++) {
      this.items[i.toString()] = null
    }
  }

  items: ItemKV = {}

  getItem(slot: string) {
    return this.items[slot]
  }

  addItemToSlot(item: Item | null, slot: string): Item | null {
    const temItem = this.getItem(slot)
    this.items[slot] = item
    return temItem
  }

  addItem(item: Item | null) {
    for (let i = 0; i < this.maxSlot; i++) {
      if (!this.items[i.toString()]) {
        this.addItemToSlot(item, i.toString())
        return true
      }
    }
    return false
  }
}
