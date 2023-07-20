import { MainSkillTag, Tag } from '../../components'
import { Skill } from './skill'

export class FireBallSkill extends Skill {
  constructor() {
    super()
    const mainSkillTag = new MainSkillTag()
    this.tags.set(mainSkillTag.name, mainSkillTag)
  }
  name: string = 'FireBall'
}
