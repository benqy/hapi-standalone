import { ItemCategory1 } from "../enum"
import { Category } from "../types"

//每帧会进行行动的单位
export interface IActor {
  maxHealth: number,
  name: string,
  currentHealth: number,
  doTick(): void
  doAction(): void
}

export interface ItemCategory {
  category1: Category,
  category2: Category,
  category3: Category,
}