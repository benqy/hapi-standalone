import { randomBetween } from '../../util'
import { AffixSchema } from '../../types'

//通过词缀列表生成的某条词缀具体的值
export class AffixValue {
  public id: string
  public name: string
  public desc: string
  public tags: string[]
  public tier: number
  public position: number
  public value: number
  public valuePath: string

  // constructor() {
  //   this.id = data.id
  //   this.name = data.name
  //   this.generalValue(data, value)
  // }

  private generalValue(data: AffixSchema, value?: number) {
    //从词缀范围中随机固定一个值
    this.value = value ?? randomBetween(data.minValue, data.maxValue)
    this.desc = data.desc.replace('n', this.value.toString())
    this.tags = data.tags
    this.tier = data.tier
    this.position = data.position
    this.valuePath = data.valuePath
  }
}
