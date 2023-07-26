import { MainSkillTag, Tag } from '../../components'
import { Skill } from './skill'

export class FireBallSkill extends Skill {
  constructor() {
    super()
    const mainSkillTag = new MainSkillTag()
    this.attackTime = 1500
    this.tags.set(mainSkillTag.name, mainSkillTag)
    this.percent = 0.8
  }
  name: string = 'FireBall'
}
