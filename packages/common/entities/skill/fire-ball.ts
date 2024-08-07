import { MainSkillTag, Tag } from '../../components'
import { Skill } from './skill'

export class FireBallSkill extends Skill {
  constructor() {
    super()
    const mainSkillTag = new MainSkillTag()
    this.attackTime = 2000
    this.tags.set(mainSkillTag.name, mainSkillTag)
    this.percent = 0.8
  }
  name: string = 'FireBall'
  actionTime = 800
}
