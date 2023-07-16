import { uuidV4 } from '../../util'
import { AffixValue } from '../modifiers'
import O from '../../core/base'

/**
 * 词缀集合类
 */
export class AffixProertys extends O {
  constructor(affixValue?: AffixValue) {
    super()
    if (affixValue) {
      this.values.set(affixValue.valuePath, affixValue.value)
    }
  }

  readonly id = uuidV4()

  private values: Map<string, number> = new Map()

  remove(affixProertys: AffixProertys) {
    affixProertys.values.forEach((value, key) => {
      if (this.values.has(key)) {
        const targetValue = this.values.get(key) - value
        if (targetValue < 0) {
          this.values.delete(key)
        } else {
          this.values.set(key, this.values.get(key) - value)
        }
      }
    })
  }

  getValue(key: string) {
    return this.values.get(key) ?? 0
  }

  getValues() {
    return this.values
  }

  add(affixProertys: AffixProertys) {
    affixProertys.values.forEach((value, key) => {
      if (this.values.has(key)) {
        this.values.set(key, this.values.get(key) + value)
      } else {
        this.values.set(key, value)
      }
    })
  }
}
