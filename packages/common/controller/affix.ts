import { AffixValue } from '../entities'
import { AffixSchema } from '../types'
import { randomBetween } from '../util'
import { IController } from '../interfaces'

export class AffixController implements IController{
  constructor() {}

  //从词缀配置中生成一条词缀, 不指定词缀数值则随机
  schemaToValue(schema: AffixSchema, value?: number): AffixValue {
    //从词缀范围中随机固定一个值
    const affixValue = new AffixValue()
    affixValue.id = schema.id
    affixValue.name = schema.name
    affixValue.value = value ?? randomBetween(schema.minValue, schema.maxValue)
    affixValue.desc = schema.desc.replace('n', affixValue.value.toString())
    affixValue.tags = schema.tags
    affixValue.tier = schema.tier
    affixValue.position = schema.position
    affixValue.valuePath = schema.valuePath
    return affixValue
  }
}
