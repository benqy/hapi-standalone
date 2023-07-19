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
}
