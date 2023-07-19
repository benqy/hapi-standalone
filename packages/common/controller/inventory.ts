import { Item } from '../entities'
import { Intenvory } from '../entities/inventory'
import { IController } from '../interfaces'

export class InventoryController implements IController {
  
  getItem(inventory: Intenvory, slot: string) {
    return inventory.items[slot]
  }

  addItemToSlot(
    inventory: Intenvory,
    item: Item | null,
    slot: string
  ): Item | null {
    const temItem = this.getItem(inventory, slot)
    inventory.items[slot] = item
    return temItem
  }

  addItem(inventory: Intenvory, item: Item | null) {
    for (let i = 0; i < inventory.maxSlot; i++) {
      if (!inventory.items[i.toString()]) {
        this.addItemToSlot(inventory, item, i.toString())
        return true
      }
    }
    return false
  }
}
