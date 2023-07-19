import { nanoid } from 'nanoid'
import { AffixValue } from '.'
import { O } from '../../core/base'

/**
 * 用来表示一系列词缀的属性汇总
 */
export class AffixProertys extends O {
  constructor() {
    super()
  }

  properties: Map<string, number> = new Map()
}
