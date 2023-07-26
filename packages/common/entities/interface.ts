import { Category } from "../types"
import { AffixProertys } from "./modifiers/affix-property";

//每帧会进行行动的单位
export interface IActor {
  maxHealth: number,
  name: string,
  currentHealth: number,
  affixProertys: AffixProertys,
  media: string,
  isDeath: boolean,
  // doTick(): void
  // doAction(): void
}

export interface ItemCategory {
  category1: Category,
  category2: Category,
  category3: Category,
}