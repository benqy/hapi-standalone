import { MapType } from '../../enum'

export class GameMap {
  id: string
  name: string
  media: string = ''
  mapType: string = MapType.sea
  minLv: number
  maxLv: number
  desc: string
  x: number
  y: number
}
