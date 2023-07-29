import { Breed } from "../components";
import { RenderData } from "../data/render-data";
import { Category } from "../types"
import { AffixProertys } from "./modifiers/affix-property";

//每帧会进行行动的单位
export interface IActor {
  maxHealth: number,
  name: string,
  currentHealth: number,
  level:number,
  affixProertys: AffixProertys,
  media: string,
  breed:Breed,
  isDeath: boolean,
  renderData?:RenderData,
  // doTick(): void
  // doAction(): void
}

export interface ItemCategory {
  category1: Category,
  category2: Category,
  category3: Category,
}