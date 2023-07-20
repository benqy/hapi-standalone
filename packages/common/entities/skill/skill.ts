import { Tag } from '../../components'

export abstract class Skill {
  name: string = 'Skill_BUG'
  tags: Map<string,Tag> = new Map()
  level:number = 1
  maxLevel:number = 5
}
