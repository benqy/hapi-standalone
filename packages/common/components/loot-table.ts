import { Category, LootTableItem } from '../types'

export class LootTable {
  constructor(public list: Category[]) {}

  choose({ num = 1 }) {
    return this.list[0]
    // const result = []
    // for (var i = 0; i < num; i++) {
    //   const random = Math.random()
    //   let total = 0
    //   for (var j = 0; j < this.list.length; j++) {
    //     const item = this.list[j]
    //     total += item.rate
    //     if (random <= total) {
    //       result.push(item)
    //       break
    //     }
    //   }
    // }
    // return result
  }
}
