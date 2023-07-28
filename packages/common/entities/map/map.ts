import { MapGroup } from '../../enum'

export class GameMap {
  id: string
  name: string
  media: string = ''
  group: string = MapGroup.sea
  minLv: number
  maxLv: number
  desc: string
  x: number
  y: number
}
