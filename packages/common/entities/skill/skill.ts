import { Tag } from '../../components'

export abstract class Skill {
  name: string = 'Skill_BUG'
  tags: Map<string,Tag> = new Map()
  level:number = 1
  attackTime:number = 1000000
  currentAttackTime:number = 0
  actionRequired:boolean = false
  actionTime:number = 1000000
  maxLevel:number = 5
  percent = 1
  // caster: IActor
}
