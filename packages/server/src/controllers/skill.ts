
import { Skill } from '@hapi/common/entities'
import { IActor } from '@hapi/common/entities/interface'
import { IController } from '@hapi/common/interfaces'
import { SkillAction } from '../actions/skill.action'
export class SkillController implements IController {

  excute(caster: IActor, skill: Skill, target?: IActor) {
    skill.currentAttackTime = Math.max(0, skill.currentAttackTime - skill.attackTime)
    skill.actionRequired = false
    const action = new SkillAction(skill)
    action.caster = caster
    action.target = target
    action.actionTime = skill.actionTime
    return action
  }

  doTick(deltaTime: number, skill: Skill): void {
    skill.currentAttackTime += deltaTime
    if (skill.currentAttackTime >= skill.attackTime) {
      skill.actionRequired = true
    }
  }
}
