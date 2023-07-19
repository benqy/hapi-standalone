import { AffixValue } from '../entities'
import { AffixSchema } from '../types'
import { randomBetween } from '../util'
import { IController } from '../interfaces'
import { AffixProertys } from '../entities/modifiers/affix-property'

export class AffixController implements IController {
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

  getProerty(affixProertys: AffixProertys, key: string) {
    return affixProertys.properties.get(key) ?? 0
  }

  add(baseProertys: AffixProertys, affixValue: AffixValue): AffixProertys
  add(baseProertys: AffixProertys, affixProertys: AffixProertys): AffixProertys
  add(
    baseProertys: AffixProertys,
    affix: AffixValue | AffixProertys
  ): AffixProertys {
    if (affix instanceof AffixValue) {
      baseProertys.properties.set(
        affix.valuePath,
        this.getProerty(baseProertys, affix.valuePath) + affix.value
      )
    } else {
      affix.properties.forEach((value, key) => {
        if (baseProertys.properties.has(key)) {
          baseProertys.properties.set(
            key,
            baseProertys.properties.get(key) + value
          )
        } else {
          baseProertys.properties.set(key, value)
        }
      })
    }
    return baseProertys
  }

  remove(baseProertys: AffixProertys, affixProertys: AffixProertys) {
    affixProertys.properties.forEach((value, key) => {
      if (baseProertys.properties.has(key)) {
        const targetValue = baseProertys.properties.get(key) - value
        if (targetValue < 0) {
          baseProertys.properties.delete(key)
        } else {
          baseProertys.properties.set(
            key,
            baseProertys.properties.get(key) - value
          )
        }
      }
    })
  }

  createAffixProertys(...affixValues: AffixValue[]): AffixProertys {
    let ap = new AffixProertys()
    affixValues.forEach((affixValue) => {
      ap = this.add(ap, affixValue)
    })
    return ap
  }
}
