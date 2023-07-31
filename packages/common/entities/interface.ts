import { Breed } from "../components";
import { RenderData } from "../data/render-data";
import { Category } from "../types"
import { AffixProertys } from "./modifiers/affix-property";
import { Skill } from "./skill";

//每帧会进行行动的单位
export interface IActor {
  id: string,
  name: string,
  breed:Breed,
  maxHealth: number,
  currentHealth: number,
  level:number,
  media: string,
  currentSkills: Skill[]
  renderData?:RenderData,
  affixProertys: AffixProertys,
  // doTick(): void
  // doAction(): void
}

export interface ItemCategory {
  category1: Category,
  category2: Category,
  category3: Category,
}