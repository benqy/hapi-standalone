import { AffixValue } from '../entities'
import { AffixSchema } from '../types'
import { randomBetween } from '../util'
import { IController } from '../interfaces'
import { AffixProertys } from '../entities/modifiers/affix-property'
import { PathKey } from '../enum'

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

  setProerty(affixProertys: AffixProertys, key: PathKey, value: number) {
    affixProertys.properties.set(key, value)
  }

  add(bp: AffixProertys, affixValue: AffixValue): AffixProertys
  add(bp: AffixProertys, affixProertys: AffixProertys): AffixProertys
  add(bp: AffixProertys, affix: AffixValue | AffixProertys): AffixProertys {
    if (affix instanceof AffixValue) {
      bp.properties.set(
        affix.valuePath,
        this.getProerty(bp, affix.valuePath) + affix.value
      )
    } else {
      affix.properties.forEach((value, key) => {
        if (bp.properties.has(key)) {
          bp.properties.set(key, bp.properties.get(key) + value)
        } else {
          bp.properties.set(key, value)
        }
      })
    }
    return bp
  }

  remove(bp: AffixProertys, affixProertys: AffixProertys) {
    affixProertys.properties.forEach((value, key) => {
      if (bp.properties.has(key)) {
        const targetValue = bp.properties.get(key) - value
        if (targetValue < 0) {
          bp.properties.delete(key)
        } else {
          bp.properties.set(key, bp.properties.get(key) - value)
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
