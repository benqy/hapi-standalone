import { Tag } from '../../components'
import { IActor } from '../interface'

export abstract class Skill {
  name: string = 'Skill_BUG'
  tags: Map<string,Tag> = new Map()
  level:number = 1
  attackTime:number = 1000000
  maxLevel:number = 5
  // caster: IActor
}
