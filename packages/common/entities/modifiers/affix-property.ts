import { nanoid } from 'nanoid'
import { AffixValue } from '.'
import { O } from '../../core/base'

/**
 * 用来表示一系列词缀的属性汇总
 */
export class AffixProertys extends O {
  constructor(affixValue?: AffixValue) {
    super()
    if (affixValue) {
      this.add(affixValue)
    }
  }

  readonly id = nanoid()

  private properties: Map<string, number> = new Map()

  remove(affixProertys: AffixProertys) {
    affixProertys.properties.forEach((value, key) => {
      if (this.properties.has(key)) {
        const targetValue = this.properties.get(key) - value
        if (targetValue < 0) {
          this.properties.delete(key)
        } else {
          this.properties.set(key, this.properties.get(key) - value)
        }
      }
    })
  }

  getProerty(key: string) {
    return this.properties.get(key) ?? 0
  }

  getProperties() {
    return this.properties
  }

  add(affixValue: AffixValue): AffixProertys
  add(affixProertys: AffixProertys): AffixProertys
  add(affix: AffixValue | AffixProertys): AffixProertys {
    if (affix instanceof AffixValue) {
      this.properties.set(
        affix.valuePath,
        this.getProerty(affix.valuePath) + affix.value
      )
    } else {
      affix.properties.forEach((value, key) => {
        if (this.properties.has(key)) {
          this.properties.set(key, this.properties.get(key) + value)
        } else {
          this.properties.set(key, value)
        }
      })
    }
    return this
  }
}
