import { Tag } from '../../components'
import { IActor } from '../interface'

export abstract class Skill {
  name: string = 'Skill_BUG'
  tags: Map<string,Tag> = new Map()
  level:number = 1
  attackTime:number = 1000000
  currentAttackTime:number = 0
  actionRequired:boolean = false
  maxLevel:number = 5
  // caster: IActor
}
