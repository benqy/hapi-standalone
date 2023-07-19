import { Item } from '../entities'
import { IController } from '../interfaces'

export class ItemController implements IController {
  //sprite地址,
  getMedia(item: Item) {
    return `/src/assets/img/items/${item.category1.name}/${item.category2.name}/test1.webp`
  }
}
