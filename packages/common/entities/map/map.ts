import { O } from "../../core";
import { MapGroup } from "../../enum";

export class GameMap extends O {
  constructor() {
    super()
  }
  
  name: string
  media: string = ''
  group:MapGroup
  minLv: number
  maxLv: number
  desc: string
  x: number
  y: number
}